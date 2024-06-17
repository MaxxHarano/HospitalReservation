## Frontend API document | JSON-RPC style

:boom:***NOTICED***:boom:

- 请求体里的**id**每次需要**不一样**
- 在一个session期间 (**login->logoff**)，每次用户请求携带的cookie是会变的；因为cookie有timeout，每次用户请求发给后端后，后端会先验证，验证成功则重新生成一个cookie传回去，以延长session时间；下一次用户请求理应携带上次新生成的cookie
- **非rpc请求**，比如`api/login` `api/logoff`的请求体**无需**"jsonrpc"等成员 | 可以看看`quick_dev.rs`里模拟请求的格式；所有`api/rpc`的请求体都必须符合`json-rpc`的格式，其余如`api/login` `api/logoff`则不需要
- 医生表还是每个医生 (**专家&&普通医生**) 都要有，尽管用户页面不需要看到普通医生的相关信息，但是考虑到排班，以及超级管理员页面也可以展示管理所有的医生
- list rpc 不用data，直接filters加list_options；只有create rpc需要data在请求体里

### Base URL

https://localhost:8080

### 1. User

#### 1.1. Create User

> POST /api/register

**Description:** sign up a new user.

**Request Headers:**

```json
Content-Type: application/json
```

**Request Body:**

```json
{
    "username": "string",
    "pwd_clear": "string",
    "phone": "string",
    "id_card": "string",
}
```

**Response:**

```json
{
	"result": {
    	"new": user_id // e.g. "new": 1001
    }
}
```

**Error Responses:**

- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

#### 1.2. Login User

**Endpoint:**

> POST /api/login
>

**Description:** log in.

**Request Headers:**

> 

**Request Body:**

```json
{
  	"usrname": "string",
    "pwd": "string",
}
```

**Response**:

```json
{
	"result": {
    	"logged_in": bool
    }
}
```

**Error Responses:**

- `404 Not Found` - User not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

#### 1.3. Logoff User

**Endpoint:**

> POST /api/logoff

**Description:** log off.

**Request Headers:**

> 

**Request Body:**

```json
{
	"logoff": bool // e.g. "logoff": true
}
```

**Response**:

```json
{
	"result": {
    	"logged_off": bool // e.g. "logged_off": true
    }
}
```

**Error Responses:**

- `404 Not Found` - User not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

### 2. Doctor

#### 2.0. Create Doctor

**Endpoint:**

> POST /api/rpc

**Description:** sign up a new doctor.

**Request Headers:**

> 

**Request Body:**

```json
{
    "jsonrpc": "2.0",
    "method": "create_doctor",
    "params": {
        "data": {
            ”department": "string",
            "name": "string",
            "title": "string", 			// "specialist" or "basic"
            "thumbnail_url": "string",  // 可以为空！！
            "profile": "string",		// 可以为空！！
        }
    },
    "id": ANY_VALUE_BUT_DIFFERENT
}
```

**Response**:

```json
{
	"id": SAME_WITH_RERUEST,
    "jsonrpc": "2.0",
    "result": {
        "data": {
            "id": int,
            "department": "string",
            "name": "string",
            "title": "string", 			// "specialist" or "basic"
            "thumbnail_url": "string",  // 可能为空！！
            "profile": "string",		// 可能为空！！
        }
    }
}
```

**Error Responses:**

- `404 Not Found` - Doctor not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

#### 2.1. Get Doctor

**Endpoint:**

> GET /api/rpc

**Description:** get a specific doctor.

**Request Headers:**

> 

**Request Body:**

```json
{
    "jsonrpc": "2.0",
    "method": "get_doctor",
    "params": {
        "id": int,						// 等待获取的医生的id
    },
    "id": ANY_VALUE_BUT_DIFFERENT
}
```

**Response**:

```json
{
	"id": SAME_WITH_RERUEST,
    "jsonrpc": "2.0",
    "result": {
        "data": {
            "id": int,
            "department": "string",
            "name": "string",
            "title": "string", 			// "specialist" or "basic"
            "thumbnail_url": "string",  // 可能为空！！
            "profile": "string",		// 可能为空！！
        }
    }
}
```

**Error Responses:**

- `404 Not Found` - Doctor not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

#### 2.2. List Doctors

**Endpoint:**

> GET /api/rpc

**Description:** list doctors.

**Request Headers:**

> 

**Request Body:**

```json
{
    "jsonrpc": "2.0",
    "method": "list_doctors",
    "params": {
        "filters": {
            // 不需要过滤就空在这儿；需要就看 https://crates.io/crates/modql
            // e.g. "id": {"$gt": 1},
        },
        "list_options": {
            // 不需要过滤就空在这儿；需要就有如下几种：
            // "limit": int
            // "offset": int
            // "order_bys": "string" (只能是"Asc"/"Desc")
        }
    }
    "id": ANY_VALUE_BUT_DIFFERENT
}
```

**Response**:

```json
{
	"id": SAME_WITH_RERUEST,
    "jsonrpc": "2.0",
    "result": {
        "data": [
            {
                "id": int,
                "department": "string",
                "name": "string",
                "title": "string", 			// "specialist" or "basic"
                "thumbnail_url": "string",  // 可能为空！！
                "profile": "string",		// 可能为空！！
            },
            {
                *SAME AS ABOVE*
            },
            ......
        ]
    }
}
```

**Error Responses:**

- `404 Not Found` - Doctor not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

#### 2.3. Update Doctor

**Endpoint:**

> PUT /api/rpc

**Description:** update a specific doctor.

**Request Headers:**

> 

**Request Body:**

```json
{
    "jsonrpc": "2.0",
    "method": "update_doctor",
    "params": {
        "id": int, 						// 等待更新的医生的id
        "data": {  						// 注意，以下fields皆可为空
            ”department": "string",
            "name": "string",
            "title": "string", 			// "specialist" or "basic"
            "thumbnail_url": "string",
            "profile": "string",
        }
    },
    "id": ANY_VALUE_BUT_DIFFERENT
}
```

**Response**:

```json
{
	"id": SAME_WITH_RERUEST,
    "jsonrpc": "2.0",
    "result": {
        "data": {
                "id": int,
                "department_id": int,
                "name": "string",
                "title": "string", 			// "specialist" or "basic"
                "thumbnail_url": "string",  // 可能为空！！
                "profile": "string",		// 可能为空！！
        },
    }
}
```

**Error Responses:**

- `404 Not Found` - Doctor not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

#### 2.4. Delete Doctor

**Endpoint:**

> DELETE /api/rpc

**Description:** delete a specific doctor.

**Request Headers:**

> 

**Request Body:**

```json
{
    "jsonrpc": "2.0",
    "method": "get_doctor",
    "params": {
        "id": int,						// 等待删除的医生的id
    },
    "id": ANY_VALUE_BUT_DIFFERENT
}
```

**Response**:

```json
{
	"id": SAME_WITH_RERUEST,
    "jsonrpc": "2.0",
    "result": {
        "data": {
                "id": int,
                "department": "string",
                "name": "string",
                "title": "string", 			// "specialist" or "basic"
                "thumbnail_url": "string",  // 可能为空！！
                "profile": "string",		// 可能为空！！
        },
    }
}
```

**Error Responses:**

- `404 Not Found` - Doctor not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

### 3. Reservation

#### 3.0. Create Reservation

**Endpoint:**

> POST /api/rpc

**Description:** create one reserve record.

**Request Headers:**

```

```

**Request Body:**

```json
{
    "jsonrpc": "2.0",
    "method": "create_reservation",
    "params": {
        "data": {
            "department": "string",
            "doctor": "string", // 如果是basic doctor，无需写这个成员，即在"data"内部不要出现"doctor"
            "username": "string",
            "time_range": "string",
        }
    },
    "id": ANY_VALUE_BUT_DIFFERENT
}
```

**Response**:

```json
{
	"id": SAME_WITH_RERUEST,
    "jsonrpc": "2.0",
    "result": {
        "data": {
            "id": int,
            "department": "string",
            "doctor": "string",				// 如果是basic doctor，返回 "doctor": null
            "username": "string",
            "time_range": "string",
        }
    }
}
```

**Error Responses:**

- `404 Not Found` - Reservation not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

#### 3.1. List Reservation

**Endpoint:**

> GET /api/rpc

**Description:** Retrieves a list of all Reservations.

:boom:***NOTICED***:boom:

如果需要进一步使用filter功能，那么就需要在前端传进来doctor_id/department_id，即在前端维护一个doctor与doctor_id，department与department_id的map

**Request Headers:**

```

```

**Request Body:**

```json
{
    "jsonrpc": "2.0",
    "method": "list_reservations",
    "params": {
        "filters": {
            // 不需要过滤就空在这儿；需要就看 https://crates.io/crates/modql
            // e.g. "id": {"$gt": 1},
        },
        "list_options": {
            // 不需要过滤就空在这儿；需要就有如下几种：
            // "limit": int
            // "offset": int
            // "order_bys": "string" (只能是"Asc"/"Desc")
        }
    }
    "id": ANY_VALUE_BUT_DIFFERENT
}
```

**Response:**

```json
{
	"id": SAME_WITH_RERUEST,
    "jsonrpc": "2.0",
    "result": {
        "data": [
            {
                "id": int,
                "department": "string",
                "doctor": "string",
                "username": "string",
                "time_range": "string",
            },
            {
                *SAME AS ABOVE*
            },
            ......
        ]
    }
}
```

**Error Responses:**

- `404 Not Found` - Reservation not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

#### 3.2 Delete Reservation

**Endpoint:**

> POST /api/rpc

**Description:** Remove a reserved record by ID.

**Request Headers:**

```
Authorization: Bearer AUTH_TOKEN
```

**Request Body:**

```json
{
    "jsonrpc": "2.0",
    "method": "delete_reservation",
    "params": {
		"id": int,						// 等待删除的记录的id
    },
    "id": ANY_VALUE_BUT_DIFFERENT
}
```

**Response:**

```json
{
	"id": SAME_WITH_RERUEST,
    "jsonrpc": "2.0",
    "result": {
        "data": {
            "id": int,
            "department": "string",
            "doctor": "string",
            "username": "string",
            "time_range": "string",
        }
    }
}
```

**Error Responses:**

- `404 Not Found` - Reservation not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

### 4. Department

#### *COMMON CURD, Nothing Special*

## Error Handling

All errors will be returned in the following format:

**Error Response Format:**

```
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "string"
  }
}
```

**Common Error Codes:**

- `400 Bad Request` - The request could not be understood or was missing required parameters.
- `401 Unauthorized` - Authentication failed or user does not have permissions for the requested operation.
- `404 Not Found` - The requested resource could not be found.
- `500 Internal Server Error` - An error occurred on the server.

## Rate Limiting

To prevent abuse, rate limiting is applied to all API endpoints. Each API token is limited to 1000 requests per hour. If the rate limit is exceeded, a `429 Too Many Requests` response will be returned.