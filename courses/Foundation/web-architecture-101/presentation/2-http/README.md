# What happens when you enter a URL into a web browser?

<!--
  Key points:
  - the structure of a URL (scheme, host, path)
  - finding a host with DNS
  - establishing a connection
  - Content-Type instead of file extension
  - an HTTP GET request/response, at the most simple level
 -->

What happens when you enter a URL into a web browser?

I have used this as an interview question before. There isn't a single definitive correct way to answer this question, because for each piece of the answer, you can either stop there, or dig deeper and uncover more pieces, and so on. How deep do you want to go?

Well, let's make a start.

## How to see pictures of cats

You have your computer (laptop, phone, whatever), with a working Internet connection, and you want to see a picture of a cat. You already know the exact URL. So you go to your web browser and type in the URL.

[TODO, pic]

Your web browser is just software. So what does it do with what you typed in?

## Understanding URLs

Let's consider the URL `https://hyf.example.net/cat`

- The part up to the `:` is called the _scheme_: here, it's `https`. It tells the browser how to interpret the rest of the URL, and also how to actually go about fetching the resource at that URL.
- The part from `//` to the next `/` is the name of the _host_ (also known as the _server name_). Here, it's `hyf.example.net`.
- The part from that `/` onwards is called the _path_. Here, it's `/cat`.

## So many computers!

the DNS bit

## Connecting

timed out

refused

accepted

The connection is just a container for two streams of data, on in each direction. So what are they saying?

## HTTP and Content-Type

Continue to [Front End & Back End](../3-front-end-and-back-end/README.md)
