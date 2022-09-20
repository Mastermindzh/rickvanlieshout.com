---
title: Scala Day 4 - A challenge!
date: "2017-04-05"
template: "post"
draft: false
category: "Development"
tags:
  - "Development"
  - "slsw"
description: "The last day of my journey with Scala is said to be a challenge"
disqusId: "24"
---

The book doesn't offer a day 4, my school, however, does. Or rather, it wants us to "create" a day 4. The main objective of day 4 is to "create a [smart](https://en.wikipedia.org/wiki/SMART_criteria) goal which fits the language and challenges you". For this purpose I came up with the following goal:

> For the "4th" day in the "Seven Languages in Seven Weeks" book, I want to create a sitemap builder which prioritises URLs based on their number of occurrences.

I picked this specific goal because Scala has awesome functionality for collections, as such it should make creating a site map a piece of cake! All the code I created for this fourth day can be found on [Github](https://github.com/Mastermindzh/Seven-Languages-in-Seven-Weeks/blob/master/Scala/Day%204/src/main/scala-2.12/MyApp.scala) or at the end of this blog post.

## My journey with Scala (and the book...)

Scala, for the most part, is pretty ok. The development tools aren't up to par with those of say Java, Python or even .net but with a bit of hassle, we can make do. The Scala collections are wicked though! I've done some really crazy things using the collections already and I'm sure there is more to come. (if anyone ever wants me to write a bit of Scala that is)

The concurrency chapter was a big failure, the book is old (2010) and covers the older API. This meant that I had to cast aside the book and create the examples with the new API myself. A drag, to say the least.

As far as functional goes, my opinion hasn't changed much. I still prefer OO, maybe because I grew up doing everything the OO way or maybe because functional programming is just not for me. Whatever the case I still prefer OO. But.... I've gained a new appreciation for the functional languages so I guess you could call this experiment a success.

Anyways, that was it for me guys, hope you enjoyed and see you later!

```scala
import java.io.{File, PrintWriter}

import scala.collection.immutable.ListMap
import scala.io.Source

object PageLinkLoader {
  //I stole this regex from somewhere for a previous project, don't remember where

  // regex commented out because pretify can't handle it
  //val hrefRegex = """<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1""".r

  // merge two maps
  def mergeMap[A, B](ms: List[Map[A, B]])(f: (B, B) => B): Map[A, B] =
    (Map[A, B]() /: (for (m <- ms; kv <- m) yield kv)) { (a, kv) =>
      a + (if (a.contains(kv._1)) kv._1 -> f(a(kv._1), kv._2) else kv)
    }

  // run through all links on a page and add them to a list
  def getLinks(url: String, urls : Map[String, Int], visited : List[String] = List[String]()) : Map[String, Int] = {

    val content = Source.fromURL(url)(io.Codec("ISO-8859-1")).mkString
    val links = hrefRegex.findAllIn(content).matchData.toList.map(_.group(2).toString)

    // filter out / , # , http://url and anything else not starting with http:// or www.
    val filteredList = links.filter(
        l => l.startsWith("/") ||
        l.startsWith("#") ||
        l.startsWith(url) ||
      l.contains(url.replace(url.split("/").last, ""))
    )

    // create new mutable list and fill with visited
    var newVisited = scala.collection.mutable.ListBuffer.empty[String]
    newVisited ++= visited.filter(p => !p.equals(url))

    //add to newVisited
    filteredList.foreach(s => {
      if(!newVisited.contains(s)){
        newVisited += s
      }
    })

    // convert list to map, count occurrences
    val foldedLinks = filteredList.foldLeft(Map[String, Int]())((map, link : String) =>
      map + (link -> links.count(_.equals(link)))
    )

    newVisited = newVisited.filter(s => !s.equals(url))

    if(newVisited.isEmpty){
      // return merged map
      mergeMap(List(urls, foldedLinks))((v1, v2) => v1 + v2)
    }else{
      getLinks(newVisited(0),mergeMap(List(urls, foldedLinks))((v1, v2) => v1 + v2), newVisited.toList)
    }
  }

}

object MyApp extends App{

  val urls = List(
    "http://servers.rickvanlieshout.com/scalatest"
  )

  def getSiteMap() = {

    var siteMap : Map[String, Int] = Map[String, Int]()

    for (url <- urls) {
      siteMap = PageLinkLoader.getLinks(url, siteMap)
      siteMap.foreach (x => println (x._1 + "-->" + x._2))
      createSiteMap(url, siteMap)
    }
  }

  // creates a sitemap, uses Java which is wicked.
  def createSiteMap(url: String, urls : Map[String, Int]) = {
    // start off with a priority of 1.0 (ranges from 1.0 to 0)
    var currentPriority = 1.0

    //sort descending
    val descUrls = ListMap(urls.toSeq.sortWith(_._2 > _._2):_*)

    // write to a file called "sitemap_for_domain.txt"
    val domainRegex = """^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)""".r
    val pw = new PrintWriter(new File("sitemap_for_"+domainRegex.findAllIn(url).matchData.toList.map(_.group(1)).mkString+".txt" ))
    //write xml header
    pw.write("\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset\n      xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n      xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n      xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9\n            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">")

    // for each url write an url block with priority, then decrease priority
    descUrls.foreach(s => {
        pw.write(
          "\n<url>\n  " +
            "<loc>" + s._1 + "</loc>\n" +
            "<priority>" + currentPriority + "</priority>" +
            "</url>"
        )
        // decrease priority if possible
        if(currentPriority >= 0.1){
          currentPriority -= 0.1
        }
      }
    )

    // write the closing statement for a sitemap
    pw.write("\n</urlset>")
    pw.close()
  }

  getSiteMap()

}
```
