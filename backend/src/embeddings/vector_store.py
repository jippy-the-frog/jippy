from typing import List
from langchain_openai import OpenAIEmbeddings

from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from langchain_core.documents import Document

from src.common.constants import LANGCHAIN_API_KEY
from src.common.constants import OPENAI_API_KEY
from src.common.constants import PINECONE_API_KEY

from src.events.models import Analysis

import os
import time

os.environ["LANGCHAIN_API_KEY"] = LANGCHAIN_API_KEY
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY


pc = Pinecone(api_key=PINECONE_API_KEY)


def create_vector_store():
    index_name = "cna-primary-index"  # change to create a new index

    existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]

    if index_name not in existing_indexes:
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
        while not pc.describe_index(index_name).status["ready"]:
            time.sleep(1)

    index = pc.Index(index_name)

    print(index)

    embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")

    vector_store = PineconeVectorStore(index=index, embedding=embeddings)

    return vector_store


vector_store = create_vector_store()


def store_documents(analysis_list: List[Analysis]):
    documents = []
    for analysis in analysis_list:
        document = Document(
            page_content=analysis.content,
            metadata={
                "id": analysis.id,
                "event_id": analysis.event_id,
                "category_id": analysis.category_id,
            },
        )
        documents.append(document)

    ids = [
        str(document.metadata["id"])
        + "-"
        + str(document.metadata["event_id"])
        + "-"
        + str(document.metadata["category_id"])
        for document in documents
    ]
    vector_store.add_documents(documents=documents, ids=ids)

    print(f"Stored {len(documents)} documents")


async def get_similar_results(query: str, top_k: int = 3):
    documents = await vector_store.asimilarity_search_with_relevance_scores(
        query=query, k=top_k
    )
    results = []
    for document, score in documents:
        results.append(
            {
                "id": document.metadata["id"],
                "event_id": document.metadata["event_id"],
                "category_id": document.metadata["category_id"],
                "content": document.page_content,
                "score": score,
            }
        )
    return results
