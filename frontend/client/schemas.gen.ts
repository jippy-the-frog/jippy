// This file is auto-generated by @hey-api/openapi-ts

export const AnalysisNoteDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    content: {
      type: "string",
      title: "Content",
    },
    start_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Start Index",
    },
    end_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "End Index",
    },
    parent_id: {
      type: "integer",
      title: "Parent Id",
    },
    parent_type: {
      $ref: "#/components/schemas/NoteType",
    },
    category: {
      anyOf: [
        {
          $ref: "#/components/schemas/CategoryDTO",
        },
        {
          type: "null",
        },
      ],
    },
    created_at: {
      type: "string",
      format: "date-time",
      title: "Created At",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      title: "Updated At",
    },
    analysis: {
      $ref: "#/components/schemas/AnalysisToEventDTO",
    },
  },
  type: "object",
  required: [
    "id",
    "content",
    "parent_id",
    "parent_type",
    "created_at",
    "updated_at",
    "analysis",
  ],
  title: "AnalysisNoteDTO",
} as const;

export const AnalysisToEventDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    category: {
      $ref: "#/components/schemas/CategoryDTO",
    },
    content: {
      type: "string",
      title: "Content",
    },
    likes: {
      items: {
        $ref: "#/components/schemas/LikeDTO",
      },
      type: "array",
      title: "Likes",
    },
    event_id: {
      type: "integer",
      title: "Event Id",
    },
    event: {
      $ref: "#/components/schemas/BaseEventDTO",
    },
  },
  type: "object",
  required: ["id", "category", "content", "likes", "event_id", "event"],
  title: "AnalysisToEventDTO",
} as const;

export const AnswerDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    points: {
      items: {
        $ref: "#/components/schemas/PointDTO",
      },
      type: "array",
      title: "Points",
    },
  },
  type: "object",
  required: ["id", "points"],
  title: "AnswerDTO",
} as const;

export const AnswerMiniDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    points: {
      items: {
        $ref: "#/components/schemas/PointMiniDTO",
      },
      type: "array",
      title: "Points",
    },
  },
  type: "object",
  required: ["id", "points"],
  title: "AnswerMiniDTO",
} as const;

export const ArticleConceptDTOSchema = {
  properties: {
    explanation: {
      type: "string",
      title: "Explanation",
    },
    concept: {
      $ref: "#/components/schemas/ConceptDTO",
    },
    likes: {
      anyOf: [
        {
          $ref: "#/components/schemas/LikeDTO",
        },
        {
          type: "null",
        },
      ],
    },
    notes: {
      items: {
        $ref: "#/components/schemas/NoteDTO",
      },
      type: "array",
      title: "Notes",
    },
  },
  type: "object",
  required: ["explanation", "concept", "likes", "notes"],
  title: "ArticleConceptDTO",
} as const;

export const ArticleConceptNoteDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    content: {
      type: "string",
      title: "Content",
    },
    start_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Start Index",
    },
    end_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "End Index",
    },
    parent_id: {
      type: "integer",
      title: "Parent Id",
    },
    parent_type: {
      $ref: "#/components/schemas/NoteType",
    },
    category: {
      anyOf: [
        {
          $ref: "#/components/schemas/CategoryDTO",
        },
        {
          type: "null",
        },
      ],
    },
    created_at: {
      type: "string",
      format: "date-time",
      title: "Created At",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      title: "Updated At",
    },
    article_concept: {
      $ref: "#/components/schemas/ArticleConceptWithArticleDTO",
    },
  },
  type: "object",
  required: [
    "id",
    "content",
    "parent_id",
    "parent_type",
    "created_at",
    "updated_at",
    "article_concept",
  ],
  title: "ArticleConceptNoteDTO",
} as const;

export const ArticleConceptWithArticleDTOSchema = {
  properties: {
    explanation: {
      type: "string",
      title: "Explanation",
    },
    concept: {
      $ref: "#/components/schemas/ConceptDTO",
    },
    article: {
      $ref: "#/components/schemas/BaseArticleDTO",
    },
  },
  type: "object",
  required: ["explanation", "concept", "article"],
  title: "ArticleConceptWithArticleDTO",
} as const;

export const ArticleDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    summary: {
      type: "string",
      title: "Summary",
    },
    url: {
      type: "string",
      title: "Url",
    },
    source: {
      $ref: "#/components/schemas/ArticleSource",
    },
    date: {
      type: "string",
      format: "date-time",
      title: "Date",
    },
    image_url: {
      type: "string",
      title: "Image Url",
    },
    categories: {
      items: {
        $ref: "#/components/schemas/CategoryDTO",
      },
      type: "array",
      title: "Categories",
    },
    bookmarks: {
      items: {
        $ref: "#/components/schemas/BookmarkDTO",
      },
      type: "array",
      title: "Bookmarks",
    },
    article_concepts: {
      items: {
        $ref: "#/components/schemas/ArticleConceptDTO",
      },
      type: "array",
      title: "Article Concepts",
    },
    original_events: {
      items: {
        $ref: "#/components/schemas/EventWithoutArticleDTO",
      },
      type: "array",
      title: "Original Events",
    },
    notes: {
      items: {
        $ref: "#/components/schemas/NoteDTO",
      },
      type: "array",
      title: "Notes",
    },
  },
  type: "object",
  required: [
    "id",
    "title",
    "summary",
    "url",
    "source",
    "date",
    "image_url",
    "categories",
    "bookmarks",
    "article_concepts",
    "original_events",
    "notes",
  ],
  title: "ArticleDTO",
} as const;

export const ArticleNoteDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    content: {
      type: "string",
      title: "Content",
    },
    start_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Start Index",
    },
    end_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "End Index",
    },
    parent_id: {
      type: "integer",
      title: "Parent Id",
    },
    parent_type: {
      $ref: "#/components/schemas/NoteType",
    },
    category: {
      anyOf: [
        {
          $ref: "#/components/schemas/CategoryDTO",
        },
        {
          type: "null",
        },
      ],
    },
    created_at: {
      type: "string",
      format: "date-time",
      title: "Created At",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      title: "Updated At",
    },
    article: {
      $ref: "#/components/schemas/BaseArticleDTO",
    },
  },
  type: "object",
  required: [
    "id",
    "content",
    "parent_id",
    "parent_type",
    "created_at",
    "updated_at",
    "article",
  ],
  title: "ArticleNoteDTO",
} as const;

export const ArticleSourceSchema = {
  type: "string",
  enum: ["CNA", "GUARDIAN"],
  title: "ArticleSource",
} as const;

export const BaseArticleDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    summary: {
      type: "string",
      title: "Summary",
    },
    url: {
      type: "string",
      title: "Url",
    },
    source: {
      $ref: "#/components/schemas/ArticleSource",
    },
    date: {
      type: "string",
      format: "date-time",
      title: "Date",
    },
    image_url: {
      type: "string",
      title: "Image Url",
    },
  },
  type: "object",
  required: ["id", "title", "summary", "url", "source", "date", "image_url"],
  title: "BaseArticleDTO",
} as const;

export const BaseEventDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    description: {
      type: "string",
      title: "Description",
    },
    is_singapore: {
      type: "boolean",
      title: "Is Singapore",
    },
    date: {
      type: "string",
      format: "date-time",
      title: "Date",
    },
    categories: {
      items: {
        $ref: "#/components/schemas/CategoryDTO",
      },
      type: "array",
      title: "Categories",
    },
    original_article: {
      $ref: "#/components/schemas/BaseArticleDTO",
    },
  },
  type: "object",
  required: [
    "id",
    "title",
    "description",
    "is_singapore",
    "date",
    "categories",
    "original_article",
  ],
  title: "BaseEventDTO",
} as const;

export const Body_log_in_auth_login_postSchema = {
  properties: {
    grant_type: {
      anyOf: [
        {
          type: "string",
          pattern: "password",
        },
        {
          type: "null",
        },
      ],
      title: "Grant Type",
    },
    username: {
      type: "string",
      title: "Username",
    },
    password: {
      type: "string",
      title: "Password",
    },
    scope: {
      type: "string",
      title: "Scope",
      default: "",
    },
    client_id: {
      anyOf: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
      title: "Client Id",
    },
    client_secret: {
      anyOf: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
      title: "Client Secret",
    },
  },
  type: "object",
  required: ["username", "password"],
  title: "Body_log_in_auth_login_post",
} as const;

export const BookmarkDTOSchema = {
  properties: {
    user_id: {
      type: "integer",
      title: "User Id",
    },
  },
  type: "object",
  required: ["user_id"],
  title: "BookmarkDTO",
  description: `Be careful when editing this model. It is used by both article/event
despite them using two different ORM models (ArticleBookmark & Bookmark)`,
} as const;

export const CategoryDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    name: {
      type: "string",
      title: "Name",
    },
  },
  type: "object",
  required: ["id", "name"],
  title: "CategoryDTO",
} as const;

export const CheckoutRequestDataSchema = {
    properties: {
        price_id: {
            type: 'string',
            title: 'Price Id'
        },
        tier_id: {
            type: 'integer',
            title: 'Tier Id'
        }
    },
    type: 'object',
    required: ['price_id', 'tier_id'],
    title: 'CheckoutRequestData'
} as const;

export const CommentAnalysisDTOSchema = {
  properties: {
    skill_issue: {
      type: "string",
      title: "Skill Issue",
    },
    analysis: {
      $ref: "#/components/schemas/AnalysisToEventDTO",
    },
  },
  type: "object",
  required: ["skill_issue", "analysis"],
  title: "CommentAnalysisDTO",
} as const;

export const CommentDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    lack_example: {
      type: "boolean",
      title: "Lack Example",
    },
    inclination: {
      $ref: "#/components/schemas/Inclination",
    },
    content: {
      type: "string",
      title: "Content",
    },
    comment_analysises: {
      items: {
        $ref: "#/components/schemas/CommentAnalysisDTO",
      },
      type: "array",
      title: "Comment Analysises",
    },
  },
  type: "object",
  required: [
    "id",
    "lack_example",
    "inclination",
    "content",
    "comment_analysises",
  ],
  title: "CommentDTO",
} as const;

export const ConceptDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    name: {
      type: "string",
      title: "Name",
    },
  },
  type: "object",
  required: ["id", "name"],
  title: "ConceptDTO",
} as const;

export const CreateUserQuestionSchema = {
  properties: {
    question: {
      type: "string",
      title: "Question",
    },
  },
  type: "object",
  required: ["question"],
  title: "CreateUserQuestion",
} as const;

export const EssayCreateSchema = {
  properties: {
    question: {
      type: "string",
      title: "Question",
    },
    paragraphs: {
      items: {
        $ref: "#/components/schemas/ParagraphDTO-Input",
      },
      type: "array",
      minItems: 1,
      title: "Paragraphs",
    },
  },
  type: "object",
  required: ["question", "paragraphs"],
  title: "EssayCreate",
} as const;

export const EssayCreateDTOSchema = {
  properties: {
    essay_id: {
      type: "integer",
      title: "Essay Id",
    },
  },
  type: "object",
  required: ["essay_id"],
  title: "EssayCreateDTO",
} as const;

export const EssayDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    question: {
      type: "string",
      title: "Question",
    },
    comments: {
      items: {
        $ref: "#/components/schemas/CommentDTO",
      },
      type: "array",
      title: "Comments",
    },
    paragraphs: {
      items: {
        $ref: "#/components/schemas/ParagraphDTO-Output",
      },
      type: "array",
      title: "Paragraphs",
    },
  },
  type: "object",
  required: ["id", "question", "comments", "paragraphs"],
  title: "EssayDTO",
} as const;

export const EssayMiniDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    question: {
      type: "string",
      title: "Question",
    },
  },
  type: "object",
  required: ["id", "question"],
  title: "EssayMiniDTO",
} as const;

export const EventDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    description: {
      type: "string",
      title: "Description",
    },
    is_singapore: {
      type: "boolean",
      title: "Is Singapore",
    },
    date: {
      type: "string",
      format: "date-time",
      title: "Date",
    },
    categories: {
      items: {
        $ref: "#/components/schemas/CategoryDTO",
      },
      type: "array",
      title: "Categories",
    },
    original_article: {
      $ref: "#/components/schemas/BaseArticleDTO",
    },
    reads: {
      items: {
        $ref: "#/components/schemas/ReadDTO",
      },
      type: "array",
      title: "Reads",
    },
    analysises: {
      items: {
        $ref: "#/components/schemas/src__events__schemas__AnalysisDTO",
      },
      type: "array",
      title: "Analysises",
    },
    gp_questions: {
      items: {
        $ref: "#/components/schemas/GPQuestionDTO",
      },
      type: "array",
      title: "Gp Questions",
    },
    bookmarks: {
      items: {
        $ref: "#/components/schemas/BookmarkDTO",
      },
      type: "array",
      title: "Bookmarks",
    },
    notes: {
      items: {
        $ref: "#/components/schemas/NoteDTO",
      },
      type: "array",
      title: "Notes",
    },
  },
  type: "object",
  required: [
    "id",
    "title",
    "description",
    "is_singapore",
    "date",
    "categories",
    "original_article",
    "reads",
    "analysises",
    "gp_questions",
    "bookmarks",
    "notes",
  ],
  title: "EventDTO",
} as const;

export const EventNoteDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    content: {
      type: "string",
      title: "Content",
    },
    start_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Start Index",
    },
    end_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "End Index",
    },
    parent_id: {
      type: "integer",
      title: "Parent Id",
    },
    parent_type: {
      $ref: "#/components/schemas/NoteType",
    },
    category: {
      anyOf: [
        {
          $ref: "#/components/schemas/CategoryDTO",
        },
        {
          type: "null",
        },
      ],
    },
    created_at: {
      type: "string",
      format: "date-time",
      title: "Created At",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      title: "Updated At",
    },
    event: {
      $ref: "#/components/schemas/BaseEventDTO",
    },
  },
  type: "object",
  required: [
    "id",
    "content",
    "parent_id",
    "parent_type",
    "created_at",
    "updated_at",
    "event",
  ],
  title: "EventNoteDTO",
} as const;

export const EventWithoutArticleDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    description: {
      type: "string",
      title: "Description",
    },
    is_singapore: {
      type: "boolean",
      title: "Is Singapore",
    },
    date: {
      type: "string",
      format: "date-time",
      title: "Date",
    },
    analysises: {
      items: {
        $ref: "#/components/schemas/src__events__schemas__AnalysisDTO",
      },
      type: "array",
      title: "Analysises",
    },
    notes: {
      items: {
        $ref: "#/components/schemas/NoteDTO",
      },
      type: "array",
      title: "Notes",
    },
  },
  type: "object",
  required: [
    "id",
    "title",
    "description",
    "is_singapore",
    "date",
    "analysises",
    "notes",
  ],
  title: "EventWithoutArticleDTO",
} as const;

export const FallbackDTOSchema = {
  properties: {
    alt_approach: {
      type: "string",
      title: "Alt Approach",
    },
    general_argument: {
      type: "string",
      title: "General Argument",
    },
  },
  type: "object",
  required: ["alt_approach", "general_argument"],
  title: "FallbackDTO",
} as const;

export const GPQuestionDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    question: {
      type: "string",
      title: "Question",
    },
    is_llm_generated: {
      type: "boolean",
      title: "Is Llm Generated",
    },
    categories: {
      items: {
        $ref: "#/components/schemas/CategoryDTO",
      },
      type: "array",
      title: "Categories",
    },
  },
  type: "object",
  required: ["id", "question", "is_llm_generated", "categories"],
  title: "GPQuestionDTO",
} as const;

export const HTTPValidationErrorSchema = {
  properties: {
    detail: {
      items: {
        $ref: "#/components/schemas/ValidationError",
      },
      type: "array",
      title: "Detail",
    },
  },
  type: "object",
  title: "HTTPValidationError",
} as const;

export const InclinationSchema = {
  type: "string",
  enum: ["good", "neutral", "bad"],
  title: "Inclination",
} as const;

export const IndexResponse_MiniArticleDTO_Schema = {
  properties: {
    total_count: {
      type: "integer",
      title: "Total Count",
    },
    count: {
      type: "integer",
      title: "Count",
    },
    data: {
      items: {
        $ref: "#/components/schemas/MiniArticleDTO",
      },
      type: "array",
      title: "Data",
    },
  },
  type: "object",
  required: ["total_count", "count", "data"],
  title: "IndexResponse[MiniArticleDTO]",
} as const;

export const IndexResponse_MiniEventDTO_Schema = {
  properties: {
    total_count: {
      type: "integer",
      title: "Total Count",
    },
    count: {
      type: "integer",
      title: "Count",
    },
    data: {
      items: {
        $ref: "#/components/schemas/MiniEventDTO",
      },
      type: "array",
      title: "Data",
    },
  },
  type: "object",
  required: ["total_count", "count", "data"],
  title: "IndexResponse[MiniEventDTO]",
} as const;

export const LikeDTOSchema = {
  properties: {
    point_id: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Point Id",
    },
    analysis_id: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Analysis Id",
    },
    type: {
      $ref: "#/components/schemas/LikeType",
    },
    user_id: {
      type: "integer",
      title: "User Id",
    },
  },
  type: "object",
  required: ["type", "user_id"],
  title: "LikeDTO",
} as const;

export const LikeDataSchema = {
  properties: {
    point_id: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Point Id",
    },
    concept_id: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Concept Id",
    },
    article_id: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Article Id",
    },
    analysis_id: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Analysis Id",
    },
    type: {
      $ref: "#/components/schemas/LikeType",
    },
  },
  type: "object",
  required: ["type"],
  title: "LikeData",
} as const;

export const LikeTypeSchema = {
  type: "integer",
  enum: [1, -1],
  title: "LikeType",
} as const;

export const MiniArticleDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    summary: {
      type: "string",
      title: "Summary",
    },
    url: {
      type: "string",
      title: "Url",
    },
    source: {
      $ref: "#/components/schemas/ArticleSource",
    },
    date: {
      type: "string",
      format: "date-time",
      title: "Date",
    },
    image_url: {
      type: "string",
      title: "Image Url",
    },
    categories: {
      items: {
        $ref: "#/components/schemas/CategoryDTO",
      },
      type: "array",
      title: "Categories",
    },
    bookmarks: {
      items: {
        $ref: "#/components/schemas/BookmarkDTO",
      },
      type: "array",
      title: "Bookmarks",
    },
  },
  type: "object",
  required: [
    "id",
    "title",
    "summary",
    "url",
    "source",
    "date",
    "image_url",
    "categories",
    "bookmarks",
  ],
  title: "MiniArticleDTO",
} as const;

export const MiniEventDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    description: {
      type: "string",
      title: "Description",
    },
    is_singapore: {
      type: "boolean",
      title: "Is Singapore",
    },
    date: {
      type: "string",
      format: "date-time",
      title: "Date",
    },
    categories: {
      items: {
        $ref: "#/components/schemas/CategoryDTO",
      },
      type: "array",
      title: "Categories",
    },
    original_article: {
      $ref: "#/components/schemas/BaseArticleDTO",
    },
    reads: {
      items: {
        $ref: "#/components/schemas/ReadDTO",
      },
      type: "array",
      title: "Reads",
    },
  },
  type: "object",
  required: [
    "id",
    "title",
    "description",
    "is_singapore",
    "date",
    "categories",
    "original_article",
    "reads",
  ],
  title: "MiniEventDTO",
} as const;

export const NoteCreateSchema = {
  properties: {
    content: {
      type: "string",
      title: "Content",
    },
    start_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Start Index",
    },
    end_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "End Index",
    },
    parent_id: {
      type: "integer",
      title: "Parent Id",
    },
    parent_id_two: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Parent Id Two",
    },
    parent_type: {
      $ref: "#/components/schemas/NoteType",
    },
    category_id: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Category Id",
    },
  },
  type: "object",
  required: ["content", "parent_id", "parent_type"],
  title: "NoteCreate",
} as const;

export const NoteDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    content: {
      type: "string",
      title: "Content",
    },
    start_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Start Index",
    },
    end_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "End Index",
    },
    parent_id: {
      type: "integer",
      title: "Parent Id",
    },
    parent_type: {
      $ref: "#/components/schemas/NoteType",
    },
    category: {
      anyOf: [
        {
          $ref: "#/components/schemas/CategoryDTO",
        },
        {
          type: "null",
        },
      ],
    },
    created_at: {
      type: "string",
      format: "date-time",
      title: "Created At",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      title: "Updated At",
    },
  },
  type: "object",
  required: [
    "id",
    "content",
    "parent_id",
    "parent_type",
    "created_at",
    "updated_at",
  ],
  title: "NoteDTO",
} as const;

export const NoteTypeSchema = {
  type: "string",
  enum: ["event", "article", "point", "analysis", "article_concept"],
  title: "NoteType",
} as const;

export const NoteUpdateSchema = {
  properties: {
    content: {
      type: "string",
      title: "Content",
    },
    start_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Start Index",
    },
    end_index: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "End Index",
    },
    category_id: {
      anyOf: [
        {
          type: "integer",
        },
        {
          type: "null",
        },
      ],
      title: "Category Id",
    },
  },
  type: "object",
  required: ["content"],
  title: "NoteUpdate",
} as const;

export const ParagraphDTO_InputSchema = {
  properties: {
    content: {
      type: "string",
      title: "Content",
    },
    type: {
      $ref: "#/components/schemas/ParagraphType",
    },
  },
  type: "object",
  required: ["content", "type"],
  title: "ParagraphDTO",
} as const;

export const ParagraphDTO_OutputSchema = {
  properties: {
    content: {
      type: "string",
      title: "Content",
    },
    type: {
      type: "string",
      title: "Type",
    },
    comments: {
      items: {
        $ref: "#/components/schemas/CommentDTO",
      },
      type: "array",
      title: "Comments",
    },
  },
  type: "object",
  required: ["content", "type", "comments"],
  title: "ParagraphDTO",
} as const;

export const ParagraphTypeSchema = {
  type: "string",
  enum: ["introduction", "paragraph", "conclusion"],
  title: "ParagraphType",
} as const;

export const PasswordResetCompleteDataSchema = {
  properties: {
    password: {
      type: "string",
      minLength: 6,
      title: "Password",
    },
    confirm_password: {
      type: "string",
      minLength: 6,
      title: "Confirm Password",
    },
  },
  type: "object",
  required: ["password", "confirm_password"],
  title: "PasswordResetCompleteData",
} as const;

export const PasswordResetMoreCompleteDataSchema = {
  properties: {
    password: {
      type: "string",
      minLength: 6,
      title: "Password",
    },
    confirm_password: {
      type: "string",
      minLength: 6,
      title: "Confirm Password",
    },
    old_password: {
      type: "string",
      title: "Old Password",
    },
  },
  type: "object",
  required: ["password", "confirm_password", "old_password"],
  title: "PasswordResetMoreCompleteData",
} as const;

export const PasswordResetRequestDataSchema = {
  properties: {
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
  },
  type: "object",
  required: ["email"],
  title: "PasswordResetRequestData",
} as const;

export const PointAnalysisDTOSchema = {
  properties: {
    analysis: {
      $ref: "#/components/schemas/src__user_questions__schemas__AnalysisDTO",
    },
    elaboration: {
      type: "string",
      title: "Elaboration",
    },
    point_id: {
      type: "integer",
      title: "Point Id",
    },
  },
  type: "object",
  required: ["analysis", "elaboration", "point_id"],
  title: "PointAnalysisDTO",
} as const;

export const PointDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    body: {
      type: "string",
      title: "Body",
    },
    positive: {
      type: "boolean",
      title: "Positive",
    },
    point_analysises: {
      items: {
        $ref: "#/components/schemas/PointAnalysisDTO",
      },
      type: "array",
      title: "Point Analysises",
    },
    fallback: {
      anyOf: [
        {
          $ref: "#/components/schemas/FallbackDTO",
        },
        {
          type: "null",
        },
      ],
    },
    likes: {
      items: {
        $ref: "#/components/schemas/LikeDTO",
      },
      type: "array",
      title: "Likes",
    },
  },
  type: "object",
  required: ["id", "title", "body", "positive", "point_analysises", "likes"],
  title: "PointDTO",
} as const;

export const PointMiniDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    title: {
      type: "string",
      title: "Title",
    },
    body: {
      type: "string",
      title: "Body",
    },
    positive: {
      type: "boolean",
      title: "Positive",
    },
  },
  type: "object",
  required: ["id", "title", "body", "positive"],
  title: "PointMiniDTO",
} as const;

export const ProfileUpdateSchema = {
  properties: {
    category_ids: {
      items: {
        type: "integer",
      },
      type: "array",
      title: "Category Ids",
    },
    top_events_period: {
      type: "integer",
      title: "Top Events Period",
      default: 7,
    },
  },
  type: "object",
  title: "ProfileUpdate",
} as const;

export const ReadDTOSchema = {
  properties: {
    first_read: {
      type: "string",
      format: "date-time",
      title: "First Read",
    },
    last_read: {
      type: "string",
      format: "date-time",
      title: "Last Read",
    },
  },
  type: "object",
  required: ["first_read", "last_read"],
  title: "ReadDTO",
} as const;

export const SignUpDataSchema = {
  properties: {
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
    password: {
      type: "string",
      minLength: 6,
      title: "Password",
    },
  },
  type: "object",
  required: ["email", "password"],
  title: "SignUpData",
} as const;

export const SubscriptionDTOSchema = {
    properties: {
        id: {
            type: 'string',
            title: 'Id'
        },
        user_id: {
            type: 'integer',
            title: 'User Id'
        },
        price_id: {
            type: 'string',
            title: 'Price Id'
        },
        customer_id: {
            type: 'string',
            title: 'Customer Id'
        },
        subscription_period_end: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Subscription Period End'
        },
        subscription_ended_date: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Subscription Ended Date'
        },
        subscription_cancel_at: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Subscription Cancel At'
        },
        subscription_cancelled_date: {
            anyOf: [
                {
                    type: 'string',
                    format: 'date-time'
                },
                {
                    type: 'null'
                }
            ],
            title: 'Subscription Cancelled Date'
        },
        status: {
            '$ref': '#/components/schemas/SubscriptionStatusType'
        }
    },
    type: 'object',
    required: ['id', 'user_id', 'price_id', 'customer_id', 'status'],
    title: 'SubscriptionDTO'
} as const;

export const SubscriptionStatusTypeSchema = {
    type: 'string',
    enum: ['active', 'cancelled', 'paused', 'past_due', 'unpaid'],
    title: 'SubscriptionStatusType'
} as const;

export const TokenSchema = {
  properties: {
    access_token: {
      type: "string",
      title: "Access Token",
    },
    token_type: {
      type: "string",
      title: "Token Type",
    },
    user: {
      $ref: "#/components/schemas/UserPublic",
    },
  },
  type: "object",
  required: ["access_token", "token_type", "user"],
  title: "Token",
} as const;

export const UserPublicSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
    categories: {
      items: {
        $ref: "#/components/schemas/CategoryDTO",
      },
      type: "array",
      title: "Categories",
    },
    top_events_period: {
      type: "integer",
      title: "Top Events Period",
      default: 7,
    },
    tier_id: {
        type: 'integer',
        title: 'Tier Id',
        default: 1
    },
    subscription: {
        anyOf: [
            {
                '$ref': '#/components/schemas/SubscriptionDTO'
            },
            {
                type: 'null'
            }
        ]
    },
  },
  type: "object",
  required: ["id", "email", "categories"],
  title: "UserPublic",
} as const;

export const UserQuestionDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    question: {
      type: "string",
      title: "Question",
    },
    answer: {
      $ref: "#/components/schemas/AnswerDTO",
    },
  },
  type: "object",
  required: ["id", "question", "answer"],
  title: "UserQuestionDTO",
} as const;

export const UserQuestionMiniDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    question: {
      type: "string",
      title: "Question",
    },
    answer: {
      $ref: "#/components/schemas/AnswerMiniDTO",
    },
  },
  type: "object",
  required: ["id", "question", "answer"],
  title: "UserQuestionMiniDTO",
} as const;

export const ValidationErrorSchema = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: "string",
          },
          {
            type: "integer",
          },
        ],
      },
      type: "array",
      title: "Location",
    },
    msg: {
      type: "string",
      title: "Message",
    },
    type: {
      type: "string",
      title: "Error Type",
    },
  },
  type: "object",
  required: ["loc", "msg", "type"],
  title: "ValidationError",
} as const;

export const ValidationResultSchema = {
  properties: {
    is_valid: {
      type: "boolean",
      title: "Is Valid",
    },
    error_message: {
      type: "string",
      title: "Error Message",
    },
  },
  type: "object",
  required: ["is_valid", "error_message"],
  title: "ValidationResult",
} as const;

export const src__events__schemas__AnalysisDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    category: {
      $ref: "#/components/schemas/CategoryDTO",
    },
    content: {
      type: "string",
      title: "Content",
    },
    likes: {
      items: {
        $ref: "#/components/schemas/LikeDTO",
      },
      type: "array",
      title: "Likes",
    },
    event_id: {
      type: "integer",
      title: "Event Id",
    },
    notes: {
      items: {
        $ref: "#/components/schemas/NoteDTO",
      },
      type: "array",
      title: "Notes",
    },
  },
  type: "object",
  required: ["id", "category", "content", "likes", "event_id", "notes"],
  title: "AnalysisDTO",
} as const;

export const src__user_questions__schemas__AnalysisDTOSchema = {
  properties: {
    id: {
      type: "integer",
      title: "Id",
    },
    content: {
      type: "string",
      title: "Content",
    },
    event: {
      $ref: "#/components/schemas/MiniEventDTO",
    },
    likes: {
      items: {
        $ref: "#/components/schemas/LikeDTO",
      },
      type: "array",
      title: "Likes",
    },
  },
  type: "object",
  required: ["id", "content", "event", "likes"],
  title: "AnalysisDTO",
} as const;
