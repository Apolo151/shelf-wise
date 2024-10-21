
# Entity-Relationship Diagram
```mermaid
erDiagram
    USER {
        INTEGER id PK
        STRING full_name
        STRING email
        STRING password
        STRING role
    }

    BOOK {
        INTEGER id PK
        STRING title
        STRING author
        STRING genre
        INT availableCopies
    }

    BORROW {
        INTEGER id PK
        INTEGER userId FK "References USER(id)"
        INTEGER bookId FK "References BOOK(id)"
        DATE borrowDate
        DATE returnDate
        STRING status
    }

    USER ||--o{ BORROW : "borrows"
    BOOK ||--o{ BORROW : "is borrowed by"

```