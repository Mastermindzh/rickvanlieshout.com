---
title: Scala Day 3 - Concurrency is key!
date: "2017-04-04"
template: "post"
draft: false
category: "Development"
tags:
  - "Development"
  - "slsw"
description: "A day full of functional joy and concurrency "
disqusId: "23"
---

Day 3 promises to go into "hard things" like XML and concurrency. So far I've been liking Scala and if it can really simplify concurrency then it might earn a permanent slot in my toolkit.

## XML

We can express XML just as easily as we do a string, the example below shows how to express some XML and how to access its inner text. Note, however, that you need to add the "scala-xml" jar file to your build solution as it no longer comes included with Scala.

```scala
scala> val movies =
     | <movies>
     | <movie genre="scifi">Star Trek</movie>
     | <movie genre="fairytale">Star Wars</movie>
     | </movies>
movies: scala.xml.Elem =
<movies>
<movie genre="scifi">Star Trek</movie>
<movie genre="fairytale">Star Wars</movie>
</movies>

scala> movies.text
res0: String =
"
Star Trek
Star Wars
"

```

We can use the " \ " operator to search for specific entries, which we can then access just as with a list:

```scala
scala> val movieNodes = movies \ "movie"
movieNodes: scala.xml.NodeSeq = NodeSeq(<movie genre="scifi">Star Trek</movie>, <movie genre="fairytale">Star Wars</movie>)

scala> movieNodes(0)
res1: scala.xml.Node = <movie genre="scifi">Star Trek</movie>
```

To check the "genre" attribute of the first item in movieNodes we run:

```scala
scala> movieNodes(1)
res3: scala.xml.Node = <movie genre="fairytale">Star Wars</movie>

scala> movieNodes(1) \ "@genre"
res4: scala.xml.NodeSeq = fairytale
```

As we can see it returned the correct genre, fairytale, for the movie "Star Wars". So far Scala delivers on its promise to make "hard things" like XML easy. Let's see what else we can do.

## Pattern matching, guards and Regex

Scala will use pattern matching often, such as when you parse XML or pass messages between threads.
The simplest form of pattern matching can be achieved with:

```scala
def doChore(chore: String): String = chore match {
  case "clean dishes" => "scrub, dry"
  case "cook dinner" => "chop, sizzle"
  case _ => "whine, complain"
}
println(doChore("clean dishes" ))
println(doChore("mow lawn" ))
```

We define two chores and an alternative. We then call the method with a valid and invalid parameter. This will match the valid one and return "scrub, dry", the second won't match and will return "whine, complain".

Scala also supports guards in the case statement. Using this to calculate factorials, for instance, we can filter out weird numbers (like 0 and negatives) while matching all the other positive numbers to x, and thus return it's factorial.

```scala
def factorial(n: Int): Int = n match {
  case 0 => 1
  case y if n < 0 => 0
  case x if x > 0 => factorial(n - 1) * n
}
  println(factorial(-2))
  println(factorial(0))
  println(factorial(5))
```

We can also use regular expressions to do our matching:

```scala
scala> val reg = """^(F|f)\w*""".r
reg: scala.util.matching.Regex = ^(F|f)\w*

scala> println(reg.findFirstIn("Fantastic"))
Some(Fantastic)

scala> println(reg.findFirstIn("not Fantastic"))
None
```

We can even combine XML and the matching features like so:

```scala
(movies \ "_" ).foreach { movie =>
  movie match {
    case <movie>{movieName}</movie> =>
      println(movieName)
    case <short>{shortName}</short> =>
      println(shortName + " (short)" )
  }
}

val movies = <movies>
   <movie>The Incredibles</movie>
   <movie>WALL E</movie>
   <short>Jack Jack Attack</short>
   <short>Geri's Game</short>
</movies>
```

This will go through every item in the tree (\_) and match it to either movie or short. If it's a movie it will just print its text, otherwise, it'll print its text + (short).

In order to get this to work however I had to download the [scala.xml](https://github.com/scala/scala-xml) library, as it no longer comes included with Scala since Scala 2.11.

## Concurrency

Finally! We get to do something with concurrency, now Scala can really show me what it's worth!

The book starts off by telling me about Actors, which have pools of threads and queues, and message passing. When you send a message (using the ! operator) you place an object on its queue. The actor then reads the message and takes action. Usually, the actor uses a pattern matcher to detect what it has to do before it starts doing something.

The book provides a sample application but that plain doesn't work. Upon investigating the issue I discovered that Scala's built-in concurrency feature is deprecated in favour of [Akka](https://akka.io/). This saddens me beyond belief. I have already worked with Akka and had expected Scala to offer me something else. This also means that the rest of the book is not going to be useful anymore.

Stubborn as I am, even with a closing deadline, I decided I wasn't going to let a stupid book stop me and decided to update the code to work with Akka. All of which can be found at [Github](https://github.com/Mastermindzh/Seven-Languages-in-Seven-Weeks/tree/master/Scala/Day%203/src/Concurrency).

This disaster can be summed up by a fantastic quote though (and I **love** quotes):

> All that is necessary is to accept the impossible, do without the
> indispensable, and bear the intolerable.
>
> \- Norris, Kathleen, As quoted in: The Litchfield Co-operator, Issues 116-163 (1945)

## Self-study

The theoretical question for the day is: _For the sizer program, what would happen if you did not create a new actor for each link you wanted to follow? What would happen to the performance of the application?_

And the answer is: it would be just as slow as the sequential one.

The practical assignment is: _Take the sizer application and add a message to count the number of links on the page._

I did this by creating another Loader and calling that in my UrlActor. The code can, once again, be found on Github or in the code block below.

```scala
object PageLinkLoader {

  def getLinks(url: String) : Int = {
    val content = Source.fromURL(url)(io.Codec("ISO-8859-1")).mkString
    val links = hrefRegex.findAllIn(content).matchData.toList.map(_.group(2))

    links.size
  }

  //I stole this regex from somewhere for a previous project, don't remember where
  val hrefRegex = """<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1""".r

}
```

So that's it, right? Wrong! My school assignment requires me to do one more assignment. What assignment is that? Well you'll just have to wait on the next blog to find out! Laters!
