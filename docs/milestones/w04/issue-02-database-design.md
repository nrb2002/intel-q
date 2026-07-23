# Database Design

## Intel-Q Queue Management System

**Version:** 1.0  
**Database:** MongoDB  
**ODM:** Mongoose  
**Last Updated:** July 2026

---

# Overview

Intel-Q uses **MongoDB** as its primary database to store users, queue tickets, and branch information. MongoDB was selected because it integrates well with Next.js, provides flexible document-based storage, and supports rapid application development using Mongoose.

The initial MVP focuses on three core collections:

- Users
- Queue Tickets
- Branches

This design satisfies the application's current requirements while allowing future expansion.

---

# Database Technology

| Technology | Purpose |
|------------|---------|
| MongoDB | Primary database |
| Mongoose | Object Data Modeling (ODM) |
| Next.js Route Handlers | Server-side data access |
| Auth.js | Authentication and session management |

---

# Collections

## Users

Stores application users including customers, staff, and administrators.

### Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| _id | ObjectId | Yes | Unique identifier |
| firstName | String | Yes | User's first name |
| lastName | String | Yes | User's last name |
| email | String | Yes | Unique email address |
| password | String | Yes | Hashed password |
| role | String | Yes | customer, staff, or admin |
| createdAt | Date | Yes | Account creation date |
| updatedAt | Date | Yes | Last profile update |

---

## Queue Tickets

Represents customers waiting for service.

### Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| _id | ObjectId | Yes | Unique identifier |
| ticketNumber | Number | Yes | Queue number |
| customerId | ObjectId | Yes | Reference to User |
| branchId | ObjectId | Yes | Reference to Branch |
| serviceType | String | Yes | Requested service |
| status | String | Yes | Waiting, In Service, Completed, Cancelled |
| createdAt | Date | Yes | Ticket creation time |
| calledAt | Date | No | Time customer was called |
| completedAt | Date | No | Time service completed |

---

## Branches

Stores organization branch information.

### Fields

| Field | Type | Required | Description |
|--------|------|----------|-------------|
| _id | ObjectId | Yes | Unique identifier |
| name | String | Yes | Branch name |
| address | String | Yes | Branch address |
| city | String | Yes | Branch city |
| createdAt | Date | Yes | Creation date |
| updatedAt | Date | Yes | Last modification |

---

# Relationships

## User → Queue Ticket

**Relationship:** One-to-Many

A customer may create multiple queue tickets over time.

```text
User (1)
    │
    └───────────< Queue Ticket (*)
```

---

## Branch → Queue Ticket

**Relationship:** One-to-Many

Each branch manages many queue tickets.

```text
Branch (1)
      │
      └───────────< Queue Ticket (*)
```

---

# Entity Relationship Diagram

```text
                +----------------------+
                |       User           |
                +----------------------+
                | _id                  |
                | firstName            |
                | lastName             |
                | email                |
                | password             |
                | role                 |
                +----------------------+
                        |
                  1     |
                        |
                        | *
                +----------------------+
                |    Queue Ticket      |
                +----------------------+
                | _id                  |
                | ticketNumber         |
                | serviceType          |
                | status               |
                | customerId           |
                | branchId             |
                | createdAt            |
                | calledAt             |
                | completedAt          |
                +----------------------+
                        ^
                        |
                  *     |
                        | 1
                +----------------------+
                |      Branch          |
                +----------------------+
                | _id                  |
                | name                 |
                | address              |
                | city                 |
                +----------------------+
```

---

# Validation Rules

## User

- Email must be unique.
- Email is stored in lowercase.
- First and last names are required.
- Passwords are stored as hashes.
- Role must be one of:
  - customer
  - staff
  - admin

---

## Queue Ticket

- Ticket number is required.
- Customer reference is required.
- Branch reference is required.
- Service type is required.
- Status must be one of:
  - Waiting
  - In Service
  - Completed
  - Cancelled

---

## Branch

- Branch name is required.
- Address is required.
- City is required.

---

# Indexing Strategy

The following indexes should be created for improved query performance:

## Users

- email (unique)

## Queue Tickets

- ticketNumber
- customerId
- branchId
- status

## Branches

- name

---

# Data Lifecycle

## User

Create → Update Profile → Active

Users are never permanently deleted during the MVP.

---

## Queue Ticket

Waiting

↓

In Service

↓

Completed

or

Cancelled

Completed and cancelled tickets may later be archived instead of deleted.

---

## Branch

Create

↓

Update

↓

Deactivate (future enhancement)

---

# Implementation Steps

## Step 1

Install mongoose.

## Step 2

Create

lib/mongodb.ts

## Step 3

Configure

.env.local

## Step 4

Create models

- User
- Branch
- QueueTicket

## Step 5

Create TypeScript interfaces.

## Step 6

Create

/api/test-db

Verify connection.

## Definition of Done

Database connects successfully.

Schemas validate correctly.

Collections appear in MongoDB.

# Future Database Enhancements

Future versions of Intel-Q may include additional collections:

- Service Counters
- Appointments
- Notifications
- Queue History
- Activity Logs
- Reports
- Audit Logs
- Organization Settings

These entities are outside the scope of the MVP but have been considered during the initial database design.

---

# Design Principles

The database design follows these principles:

- Keep schemas simple and focused.
- Use document references to maintain relationships.
- Validate data at the schema level.
- Support future scalability without over engineering the MVP.
- Store business logic in server-side route handlers and services rather than in the database.

---

# Summary

The Intel-Q database consists of three primary collections—Users, Queue Tickets, and Branches—which provide the foundation for authentication, queue management, and organizational structure. This design aligns with the project's MVP goals while remaining flexible for future enhancements such as appointments, analytics, and multi-organization support.