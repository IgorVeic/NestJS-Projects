-- ARTISTS
INSERT INTO artist (id, artist_name, age, country, created_by, created_at, updated_at, deleted_at) 
VALUES 
(uuid_generate_v4(), 'Bob Dylan', 81, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'The Beatles', 50, 'UK', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Michael Jackson', 62, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Elton John', 74, 'UK', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Madonna', 63, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Queen', 50, 'UK', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Elvis Presley', 42, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Frank Sinatra', 82, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'David Bowie', 69, 'UK', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Prince', 57, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Adele', 33, 'UK', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Beyoncé', 40, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Stevie Wonder', 71, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Led Zeppelin', 52, 'UK', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Pink Floyd', 53, 'UK', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'U2', 46, 'Ireland', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Bruce Springsteen', 72, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Rolling Stones', 79, 'UK', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Whitney Houston', 48, 'USA', 'igorveic@mail.com', NOW(), NOW(), NULL),
(uuid_generate_v4(), 'Celine Dion', 54, 'Canada', 'igorveic@mail.com', NOW(), NOW(), NULL);

-- SONGS
INSERT INTO song (id, song_name, duration, genre, release_date, album_id, artist_id, created_by, created_at, updated_at)
VALUES 
    (uuid_generate_v4(), 'Like a Rolling Stone', 6.13, 'Rock', '1965-07-20', (SELECT id FROM album WHERE album_name  = 'Highway 61 Revisited'), (SELECT id FROM artist WHERE artist_name = 'Bob Dylan'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Hey Jude', 7.11, 'Rock', '1968-08-26', (SELECT id FROM album WHERE album_name  = 'The Beatles (The White Album)'), (SELECT id FROM artist WHERE artist_name = 'The Beatles'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Billie Jean', 4.54, 'Pop', '1983-01-02', (SELECT id FROM album WHERE album_name  = 'Thriller'), (SELECT id FROM artist WHERE artist_name = 'Michael Jackson'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Rocket Man', 4.41, 'Pop', '1972-04-07', (SELECT id FROM album WHERE album_name  = 'Honky Château'), (SELECT id FROM artist WHERE artist_name = 'Elton John'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Like a Virgin', 3.38, 'Pop', '1984-11-12', (SELECT id FROM album WHERE album_name  = 'Like a Virgin'), (SELECT id FROM artist WHERE artist_name = 'Madonna'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Bohemian Rhapsody', 5.55, 'Rock', '1975-10-31', (SELECT id FROM album WHERE album_name  = 'A Night at the Opera'), (SELECT id FROM artist WHERE artist_name = 'Queen'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Can''t Help Falling in Love', 3.01, 'Pop', '1961-10-01', (SELECT id FROM album WHERE album_name  = 'Blue Hawaii'), (SELECT id FROM artist WHERE artist_name = 'Elvis Presley'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'My Way', 4.36, 'Pop', '1969-03-24', (SELECT id FROM album WHERE album_name  = 'My Way'), (SELECT id FROM artist WHERE artist_name = 'Frank Sinatra'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Space Oddity', 5.16, 'Rock', '1969-07-11', (SELECT id FROM album WHERE album_name  = 'David Bowie (Space Oddity)'), (SELECT id FROM artist WHERE artist_name = 'David Bowie'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Purple Rain', 8.41, 'Pop', '1984-06-25', (SELECT id FROM album WHERE album_name  = 'Purple Rain'), (SELECT id FROM artist WHERE artist_name = 'Prince'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Rolling in the Deep', 3.48, 'Pop', '2010-11-29', (SELECT id FROM album WHERE album_name  = '21'), (SELECT id FROM artist WHERE artist_name = 'Adele'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Single Ladies (Put a Ring on It)', 3.13, 'Pop', '2008-10-13', (SELECT id FROM album WHERE album_name  = 'I Am... Sasha Fierce'), (SELECT id FROM artist WHERE artist_name = 'Beyoncé'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Superstition', 4.26, 'Pop', '1972-10-24', (SELECT id FROM album WHERE album_name  = 'Talking Book'), (SELECT id FROM artist WHERE artist_name = 'Stevie Wonder'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Stairway to Heaven', 8.02, 'Rock', '1971-11-08', (SELECT id FROM album WHERE album_name  = 'Led Zeppelin IV'), (SELECT id FROM artist WHERE artist_name = 'Led Zeppelin'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Comfortably Numb', 6.22, 'Rock', '1979-11-30', (SELECT id FROM album WHERE album_name  = 'The Wall'), (SELECT id FROM artist WHERE artist_name = 'Pink Floyd'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'With or Without You', 4.56, 'Rock', '1987-03-09', (SELECT id FROM album WHERE album_name  = 'The Joshua Tree'), (SELECT id FROM artist WHERE artist_name = 'U2'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'Born to Run', 4.30, 'Rock', '1975-08-25', (SELECT id FROM album WHERE album_name  = 'Born to Run'), (SELECT id FROM artist WHERE artist_name = 'Bruce Springsteen'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), '(I Can''t Get No) Satisfaction', 3.43, 'Rock', '1965-06-06', (SELECT id FROM album WHERE album_name  = 'Out of Our Heads'), (SELECT id FROM artist WHERE artist_name = 'Rolling Stones'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'I Will Always Love You', 4.31, 'Pop', '1992-11-03', (SELECT id FROM album WHERE album_name  = 'The Bodyguard (Original Soundtrack Album)'), (SELECT id FROM artist WHERE artist_name = 'Whitney Houston'), 'igorveic@mail.com', NOW(), NOW()),
    (uuid_generate_v4(), 'My Heart Will Go On', 4.41, 'Pop', '1997-12-08', (SELECT id FROM album WHERE album_name  = 'Let''s Talk About Love'), (SELECT id FROM artist WHERE artist_name = 'Celine Dion'), 'igorveic@mail.com', NOW(), NOW());

-- ALBUMS
    INSERT INTO album (id, album_name, artist_name, year, artist_id, created_by, created_at, updated_at, deleted_at)
VALUES
    (uuid_generate_v4(), '1989', 'Taylor Swift', '2014', (SELECT id FROM artist WHERE artist_name = 'Taylor Swift'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Highway 61 Revisited', 'Bob Dylan', '1965', (SELECT id FROM artist WHERE artist_name = 'Bob Dylan'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'The Beatles (The White Album)', 'The Beatles', '1968', (SELECT id FROM artist WHERE artist_name = 'The Beatles'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Thriller', 'Michael Jackson', '1982', (SELECT id FROM artist WHERE artist_name = 'Michael Jackson'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Honky Château', 'Elton John', '1972', (SELECT id FROM artist WHERE artist_name = 'Elton John'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Like a Virgin', 'Madonna', '1984', (SELECT id FROM artist WHERE artist_name = 'Madonna'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'A Night at the Opera', 'Queen', '1975', (SELECT id FROM artist WHERE artist_name = 'Queen'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Blue Hawaii', 'Elvis Presley', '1961', (SELECT id FROM artist WHERE artist_name = 'Elvis Presley'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'My Way', 'Frank Sinatra', '1969', (SELECT id FROM artist WHERE artist_name = 'Frank Sinatra'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'David Bowie (Space Oddity)', 'David Bowie', '1969', (SELECT id FROM artist WHERE artist_name = 'David Bowie'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Purple Rain', 'Prince', '1984', (SELECT id FROM artist WHERE artist_name = 'Prince'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), '21', 'Adele', '2011', (SELECT id FROM artist WHERE artist_name = 'Adele'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'I Am... Sasha Fierce', 'Beyoncé', '2008', (SELECT id FROM artist WHERE artist_name = 'Beyoncé'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Talking Book', 'Stevie Wonder', '1972', (SELECT id FROM artist WHERE artist_name = 'Stevie Wonder'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Led Zeppelin IV', 'Led Zeppelin', '1971', (SELECT id FROM artist WHERE artist_name = 'Led Zeppelin'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'The Wall', 'Pink Floyd', '1979', (SELECT id FROM artist WHERE artist_name = 'Pink Floyd'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'The Joshua Tree', 'U2', '1987', (SELECT id FROM artist WHERE artist_name = 'U2'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Born to Run', 'Bruce Springsteen', '1975', (SELECT id FROM artist WHERE artist_name = 'Bruce Springsteen'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Out of Our Heads', 'Rolling Stones', '1965', (SELECT id FROM artist WHERE artist_name = 'Rolling Stones'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'The Bodyguard (Original Soundtrack Album)', 'Whitney Houston', '1992', (SELECT id FROM artist WHERE artist_name = 'Whitney Houston'), 'igorveic@mail.com', NOW(), NOW(), NULL),
    (uuid_generate_v4(), 'Let''s Talk About Love', 'Celine Dion', '1997', (SELECT id FROM artist WHERE artist_name = 'Celine Dion'), 'igorveic@mail.com', NOW(), NOW(), NULL);

