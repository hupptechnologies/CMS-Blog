[06-09-2024]

```
ALTER TABLE users ADD COLUMN access JSONB;
```


[05-09-2024]

```
ALTER TABLE users
ADD COLUMN has_seen_welcome_message BOOLEAN NOT NULL DEFAULT FALSE;
```

[30-08-2024]

```
CREATE TABLE tour_steps (
  id SERIAL PRIMARY KEY,
  target VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  placement VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

[21-08-2024]

```
CREATE TABLE translations (
  id SERIAL PRIMARY KEY,
  language VARCHAR(255) NOT NULL,
  translations JSONB NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

[16-08-2024]

```
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  status ENUM('active', 'inactive') NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

[06-08-2024]

```
CREATE TABLE log (
  id SERIAL PRIMARY KEY,
  level VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  additional_info JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE (created_at);
```

```
CREATE TABLE replies (
  id SERIAL PRIMARY KEY,
  comment_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comments(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);
```

[05-08-2024]

```
CREATE TYPE comment_status AS ENUM ('delivered', 'pending', 'deleted');
```

```
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  blog_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  status comment_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (blog_id) REFERENCES blogs(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);
```

```
CREATE TABLE blog_manage (
  id SERIAL PRIMARY KEY,
  blog_id INTEGER NOT NULL,
  status ENUM('draft', 'scheduled', 'published', 'archived', 'deleted') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (blog_id) REFERENCES blogs(id)
);
```

[02-08-2024]

```
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  blog_id INTEGER,
  activity_type VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (blog_id) REFERENCES blogs(id)
);
```

```
CREATE TABLE views (
  user_id INTEGER NOT NULL,
  blog_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id, blog_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (blog_id) REFERENCES blogs(id)
);
```
