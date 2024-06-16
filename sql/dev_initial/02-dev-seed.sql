-- root user (at id = 0)
INSERT INTO "user" 
    (id,  typ, username, phone, id_card, cid, ctime, mid, mtime) VALUES 
    (0, 'Sys', 'root',  93219312,  410222123123123,  0,   now(), 0,   now());

-- User demo1
INSERT INTO "user" 
    (username, phone, id_card, cid, ctime, mid, mtime) VALUES 
    ('demo1',  29137129312,  4102213241431234,  0,   now(), 0,   now());

-- Agent mock-01 (with 'parrot' model) (id: 100)
INSERT INTO "agent"    
    (id,  owner_id, name,      cid, ctime, mid, mtime) VALUES
    (100, 0,        'mock-01', 0,   now(), 0,   now());

INSERT INTO "department"
    (id, name, cid, ctime, mid, mtime) VALUES
    (1, 'cardiovacular', 0, now(), 0, now());

INSERT INTO "department"
    (id, name, cid, ctime, mid, mtime) VALUES
    (2, 'respiratory', 0, now(), 0, now());

INSERT INTO "department"
    (id, name, cid, ctime, mid, mtime) VALUES
    (3, 'neural', 0, now(), 0, now());

INSERT INTO "doctor"
    (id, department_id, name, title, thumbnail_url, profile, cid, ctime, mid, mtime) VALUES
    (1, 1, 'Dr. A', 'Specialist', 'https://pornhubA.cn', 'a handsome guy', 0, now(), 0, now());

INSERT INTO "doctor"
    (id, department_id, name, title, thumbnail_url, profile, cid, ctime, mid, mtime) VALUES
    (2, 1, 'Dr. B', 'Specialist', 'https://pornhubB.cn', 'a handsome guy', 0, now(), 0, now());

INSERT INTO "doctor"
    (id, department_id, name, title, thumbnail_url, profile, cid, ctime, mid, mtime) VALUES
    (3, 2, 'Dr. C', 'Specialist', 'https://pornhubC.cn', 'a handsome guy', 0, now(), 0, now());

INSERT INTO "doctor"
    (id, department_id, name, title, thumbnail_url, profile, cid, ctime, mid, mtime) VALUES
    (4, 2, 'Dr. D', 'Specialist', 'https://pornhubD.cn', 'a handsome guy', 0, now(), 0, now());

INSERT INTO "doctor"
    (id, department_id, name, title, thumbnail_url, profile, cid, ctime, mid, mtime) VALUES
    (5, 3, 'Dr. E', 'Specialist', 'https://pornhubE.cn', 'a handsome guy', 0, now(), 0, now());
