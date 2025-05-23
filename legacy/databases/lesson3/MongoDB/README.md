# MongoDB - Introduction

MongoDB Lesson 1 for Hack Your Future **_Class12_**

## MongoDB not RDBMS

## Not a Transactional DB (You can not be sure that the data is not changed from other sources while you update it)

## Data is saved in JSON format but in Binary not Text, BSON (Bee-SON)

```json
{
  "firstname": "Peter",
  "lastname": "Membrey",
  "numbers": [
    {
      "phone": "+852 1234 5678"
    },
    {
      "fax": "+44 1234 565 555"
    }
  ]
}
```

## There are no tables vs. RDBMS which has a static design

## Installing MongoDB on Microsoft Windows

[Download] (<https://www.mongodb.com/download-center/community>)

1. Select the zip version
2. Unpack to c:\MongoDB
3. Open a command prompt
4. Create c:\data\db with mkdir c:\data, mkdir c:\data\db
5. Starting the server Run c:\MongoDb\bin\mongod.exe
6. Open a command prompt
7. Run c:\MongoDB\bin\mongo.exe

## Installing MongoDB on Mac

### Install Homebrew

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Then:

1. Install Homebrew: **/usr/bin/ruby -e “$(curl -fsSL <https://raw.githubusercontent.com/Hom...)”>**
2. Tap the MongoDB Homebrew Tap: **brew tap mongodb/brew**
3. Install MongoDB: **brew install mongodb-community@4.2**
4. Run MongoDB: **mongod --config /usr/local/etc/mongod.conf OR brew services start mongodb-community@4.2**
5. Connect and Use MongoDB: **mongo**

## Basic commands

Table 2-2: Basic Commands within the MongoDB Shell
Open table as spreadsheet

| Command          | Function                                              |
| ---------------- | ----------------------------------------------------- |
| show dbs         | Shows the names of the available databases.           |
| show collections | Shows the collections in the current database.        |
| show users       | Shows the users in the current database.              |
| use "db name"    | Sets the current database to "db name" or creates it. |

**_collection is a commonly used term in MongoDB. You can think of a collection as a container that stores your documents (that is, your data)_**

## Datatypes

- **_String_**: This commonly used datatype contains a string of text (or any other kind of characters). This datatype is used mostly for storing text values (for example, "Country" : "Japan"}.
- **_Integer_** (32b and 64b): This type is used to store a numerical value (for example, { "Rank" : 1 }). Note that there are no quotes placed before or after the integer.
- **_Boolean_**: This datatype can be set to either TRUE or FALSE.
- **_Double_**: This datatype is used to store floating-point values.
- **_Min /Max key_**s: This datatype is used to compare a value against the lowest and highest BSON elements, respectively.
- **_Arrays_**: This datatype is used to store arrays (for example, ["Membrey, Peter","Plugge, Eelco","Hows, David"]).
- **_Timestamp_**: This datatype is used to store a timestamp. This can be handy for recording when a document has been modified or added.
- **_Object_**: This datatype is used for embedded documents.
- **_Null_**: This datatype is used for a Null value.
- **_Symbol_**: This datatype is used identically to a string; however, it's generally reserved for languages that use a specific symbol type.
- **_Date_** \* : This datatype is used to store the current date or time in Unix time format (POSIX time).
- **_Object ID_** \*: This datatype is used to store the document's ID.
- **_Binary data_** \*: This datatype is used to store binary data.
- **_Regular expression_** \*: This datatype is used for regular expressions. All options are represented by specific characters provided in alphabetical order. You will learn more about regular expressions in Chapter 4.
- **_JavaScript Code_** \*: This datatype is used for JavaScript code.

The **_asterisks_** mean that the last five datatypes (date, object ID, binary data, regex, and JavaScript code) are non-JSON types; specifically, they are special datatypes that BSON allows you to use. In Chapter 4, you will learn how to identify your datatypes by using the $type operator.

In the relational approach, your data structure might look something like this:

```text
|_media
    |_cds
        |_id, artist, title, genre, releasedate
    |_ cd_tracklists
        |_cd_id, songtitle, length
```

In the nonrelational approach, your data structure might look something like this:

```text
|_media
    |_items
        |_<document>
```

In the nonrelational approach, the document might look something like the following:

```json
{
  "Type": "CD",
  "Artist": "Nirvana",
  "Title": "Nevermind",
  "Genre": "Grunge",
  "Releasedate": "1991.09.24",
  "Tracklist": [
    {
      "Track": "1",
      "Title": "Smells Like Teen Spirit",
      "Length": "5:02"
    },
    {
      "Track": "2",
      "Title": "In Bloom",
      "Length": "4:15"
    }
  ]
}
```

## Creating the \_id Field

Every object within the MongoDB database contains a unique identifier to distinguish that object from every other object. This identifier is called the **_\_id_** key, and it is added automatically to every document you create in a collection

The **_\_id_** key is the first attribute added in each new document you create. This remains true even if you do not tell MongoDB to create the key. For example, none of the code in the preceding examples used the **_\_id_** key. Nevertheless, MongoDB created an \_id key for you automatically in each document. It did so because_id key is a mandatory element for each document in the collection.

The **_\_id_** key consists of 12 bytes (12\*8=96 bits, 2^96=7.9228163e+28 combinations), it is almost Unique. 4-byte timestamp (seconds since epoch, or January 1st, 1970), a 3-byte machine ID, a 2-byte process ID, and a 3-byte counter
