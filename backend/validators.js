import Joi from 'joi';

// Password validation schema (strong password requirements)
const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]/)
  .messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  });

// ===================== AUTH SCHEMAS =====================

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: passwordSchema.required().messages({
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Password confirmation is required',
  }),
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'any.required': 'Name is required',
  }),
  role: Joi.string().valid('student', 'developer', 'mentor').default('student'),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'any.required': 'Refresh token is required',
  }),
});

// ===================== USER SCHEMAS =====================

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  settings: Joi.object({
    notifications: Joi.object({
      emailNotifications: Joi.boolean(),
      pushNotifications: Joi.boolean(),
      chatNotifications: Joi.boolean(),
    }),
    privacy: Joi.object({
      profileVisibility: Joi.string().valid('public', 'private', 'connections'),
      showEmail: Joi.boolean(),
    }),
  }),
}).min(1);

// ===================== PROFILE SCHEMAS =====================

export const updateProfileSchema = Joi.object({
  bio: Joi.string().max(500),
  headline: Joi.string().max(120),
  location: Joi.string().max(100),
  socialLinks: Joi.object({
    github: Joi.string().uri().allow(''),
    linkedin: Joi.string().uri().allow(''),
    twitter: Joi.string().uri().allow(''),
    portfolio: Joi.string().uri().allow(''),
  }),
}).min(1);

// ===================== PROJECT SCHEMAS =====================

export const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'any.required': 'Project name is required',
  }),
  description: Joi.string().max(1000),
  category: Joi.string().valid('web', 'mobile', 'ai', 'design', 'other'),
  visibility: Joi.string().valid('public', 'private', 'invite').default('private'),
  settings: Joi.object({
    allowPublicInvites: Joi.boolean().default(false),
    requireApprovalToJoin: Joi.boolean().default(true),
    allowFileUploads: Joi.boolean().default(true),
    maxFileSize: Joi.number().default(10485760),
  }),
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().max(1000),
  status: Joi.string().valid('active', 'archived', 'completed'),
  visibility: Joi.string().valid('public', 'private', 'invite'),
}).min(1);

export const addProjectMemberSchema = Joi.object({
  userId: Joi.string().required().messages({
    'any.required': 'User ID is required',
  }),
  role: Joi.string().valid('member', 'lead', 'viewer').default('member'),
});

// ===================== TASK SCHEMAS =====================

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(200).required().messages({
    'any.required': 'Task title is required',
  }),
  description: Joi.string().max(2000),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium'),
  assignedTo: Joi.array().items(Joi.string()),
  dueDate: Joi.date(),
  tags: Joi.array().items(Joi.string()),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  description: Joi.string().max(2000),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
  dueDate: Joi.date(),
  tags: Joi.array().items(Joi.string()),
}).min(1);

export const updateTaskStatusSchema = Joi.object({
  status: Joi.string().valid('todo', 'in_progress', 'done', 'blocked').required().messages({
    'any.required': 'Status is required',
  }),
});

// ===================== COMMENT SCHEMAS =====================

export const createCommentSchema = Joi.object({
  content: Joi.string().min(1).max(5000).required().messages({
    'any.required': 'Comment content is required',
  }),
  mentions: Joi.array().items(Joi.string()),
});

export const updateCommentSchema = Joi.object({
  content: Joi.string().min(1).max(5000).required().messages({
    'any.required': 'Comment content is required',
  }),
});

// ===================== CONNECTION SCHEMAS =====================

export const sendConnectionSchema = Joi.object({
  receiverId: Joi.string().required().messages({
    'any.required': 'Receiver ID is required',
  }),
  message: Joi.string().max(500),
});

// ===================== MARKETPLACE SCHEMAS =====================

export const createMarketplaceServiceSchema = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    'any.required': 'Service title is required',
  }),
  description: Joi.string().min(20).max(2000).required().messages({
    'any.required': 'Service description is required',
  }),
  category: Joi.string().valid('mentoring', 'consulting', 'tutoring', 'freelance').required(),
  skills: Joi.array().items(Joi.string()),
  pricing: Joi.object({
    hourlyRate: Joi.number().positive(),
    packagePrice: Joi.number().positive(),
    currency: Joi.string().default('USD'),
  }),
  availability: Joi.array().items(
    Joi.object({
      dayOfWeek: Joi.number().min(0).max(6),
      startTime: Joi.string().pattern(/^\d{2}:\d{2}$/),
      endTime: Joi.string().pattern(/^\d{2}:\d{2}$/),
      timezone: Joi.string(),
    }),
  ),
});

// ===================== BOOKING SCHEMAS =====================

export const createBookingSchema = Joi.object({
  serviceId: Joi.string().required().messages({
    'any.required': 'Service ID is required',
  }),
  scheduledAt: Joi.date().iso().required().messages({
    'any.required': 'Scheduled date is required',
  }),
  duration: Joi.number().min(15).max(480).required().messages({
    'number.min': 'Minimum duration is 15 minutes',
    'any.required': 'Duration is required',
  }),
  notes: Joi.string().max(1000),
});

// ===================== PAGINATION SCHEMAS =====================

export const paginationSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(20),
  sort: Joi.string().default('-createdAt'),
});

// ===================== ID VALIDATION =====================

export const mongoIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
  'string.pattern.base': 'Invalid ID format',
});

export default {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  updateUserSchema,
  updateProfileSchema,
  createProjectSchema,
  updateProjectSchema,
  addProjectMemberSchema,
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  createCommentSchema,
  updateCommentSchema,
  sendConnectionSchema,
  createMarketplaceServiceSchema,
  createBookingSchema,
  paginationSchema,
  mongoIdSchema,
};
