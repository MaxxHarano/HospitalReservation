-- root user (at id = 0)
INSERT INTO "user" 
    (id,  typ, username, cid, ctime, mid, mtime) VALUES 
    (0, 'Sys', 'root',  0,   now(), 0,   now());

-- User demo1
INSERT INTO "user" 
    (username, cid, ctime, mid, mtime) VALUES 
    ('demo1',  0,   now(), 0,   now());

-- Agent mock-01 (with 'parrot' model) (id: 100)
INSERT INTO "agent"    
    (id,  owner_id, name,      cid, ctime, mid, mtime) VALUES
    (100, 0,        'mock-01', 0,   now(), 0,   now());

INSERT INTO "department"
    (id, name, cid, ctime, mid, mtime) VALUES
    (2, 'heart', 0, now(), 0, now());

INSERT INTO "doctor"
    (id, department_id, name, title, thumbnail_url, profile, cid, ctime, mid, mtime) VALUES
    (5, 2, 'detcher', 'Basic', 'https://pornhub.cn', 'a handsome guy', 0, now(), 0, now());

