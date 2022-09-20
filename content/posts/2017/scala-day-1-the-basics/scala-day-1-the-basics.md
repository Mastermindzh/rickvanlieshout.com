---
title: Scala Day 1 - The Basics
date: "2017-04-02"
template: "post"
draft: false
category: "Development"
tags:
  - "Development"
  - "slsw"
description: "Let's take a deep dive into a programming book and Scala!"
disqusId: "21"
---

So day 1 has arrived, I've opened the book and I've started looking at the assignments in front of me. The book starts off by telling us how to install Scala so that is what I'll start with today.

## Installing Scala

Being on Linux the first thing I did was use my package manager of choice (Pacman) to check whether there was a Scala package in my repositories. Sure enough, it found a package (20MB in size) and proceeded to download and install said package.

While Pacman started collecting all the little dots, I took a quick look at the [Scala download page](https://www.scala-lang.org/download/install.html). On there I am greeted with a friendly message telling me the binary for my system is ready to download. Right below the download button is a link on how to install Scala. Curiosity got to me and I decided to open the link. The installation steps briefly explain that there are 2 binaries in the compressed folder which are of importance: "scala" and "scalac". To anyone coming from Java, these should be fairly familiar seeing as Java uses "java" and "javac" for their interpreter and compiler respectively. (note: the installation steps assume you know how to add PATH variables).

The next message on this page tells me about a popular build tool called `sbt` so I went ahead and installed that as well.

The final step on this page recommends me to install "[The Scala IDE](http://scala-ide.org/?_ga=1.153666491.264179122.1490891096)" or use the IntelliJ plugin. Seeing as I adore the JetBrains product line I've opted to choose the latter.

While browsing the downloads page I noticed Pacman had beat his level. (a.k.a collected all the dots. a.k.a the install has finished) Which means it's high time for me to continue on with the assignments.

## Scala types

The next step in the book guides me through using the interpreter to execute basic bits of code. These range from a simple hello world to entering some arithmetics. In the code block below you can see both my input and the interpreter's output.

```scala
scala> println("hello, surreal world")
hello, surreal world

scala> 1 + 1
res1: Int = 2

scala> 5 + 4 * 3
res2: Int = 17

scala> 5. + (4.*(3))
res3: Int = 17
```

Two things struck me as odd about these results. First up the word "Int" is written with a capital I. This is weird to me because in Java "int" is a base type, not a class (it uses the Integer wrapper class). Next up is the "ResX" line, does that just mean result or is there something more to find out about it? After a quick Google search I found out the "res" is an immutable variable which we can use like so:

```scala
res0: Int = 10

scala> res0 + 10
res1: Int = 20
```

## Type inference, arrow notation, "var vs val" and GitHub

At this point the code is getting slightly more complicated and typing it all directly into the interpreter would be a fool's effort. Therefore I've switched to using IntelliJ with the scala plugin and .scala files. All the files can be found on [GitHub](https://github.com/Mastermindzh/Seven-Languages-in-Seven-Weeks/tree/master/Scala/Day%201).

After fiddling a bit with the examples I've found a few things I already like in Scala:

- Type inference. To me, not having to specify the type of a variable is strangely satisfying.
- Anonymous function syntax support (a.k.a arrow notation).
- First class ranges
- 1 line methods without braces
- companion objects ([extending.scala](https://github.com/Mastermindzh/Seven-Languages-in-Seven-Weeks/blob/master/Scala/Day%201/extending.scala) on Github)
- No semicolons! (although I sometimes use them by accident)

## Inheritance is weird

Inheritance is one of the many joys from the Object-Oriented programming paradigm and I'm glad to read Scala supports inheritance too. The way Scala does it, however, is rather weird in my opinion. Take a look at the following code:

```scala
class Person(val name: String) {
  def talk(message: String) = println(name + " says " + message)
  def id(): String = name
}
class Employee(override val name: String, val number: String) extends Person(name) {

  override def talk(message: String) {
    println(name + " with number " + number + " says: " + message)
  }

  override def id():String = number.toString

}
```

As you can see we have to specify the parameter list of the class we want to extend. Also, note that we don't have to specify the type of said parameters. Another peculiarity is the "override" keyword. Apparently, it is mandatory to prevent the creation of new methods due to mis-spelling .... lame.

## Traits

Traits, in short, resemble a Java interface combined with an implementation.

We will start by defining a trait "Bad" for the Person class we've defined earlier:

```scala
trait Bad{
  def curse() = println("Object oriented languages are cool too!");
}
```

Next, we'll override the person class with a new class and add the "Bad" trait:

```scala
class BadPerson(override val name:String) extends Person(name) with Bad
```

Now if we create a new object of BadPerson we can call the "curse" method.

```scala
val badPerson = new BadPerson("Mr. bad")
badPerson.curse
```

We can also add multiple traits to a class by repeating "with TRAIT" like so:

```scala
class IndecisivePerson(override val name: String) extends Person(name) with Nice with Bad
```

## Self-Study

At the end of every day, the book ends with a few assignments, some are theoretical and some are practical.

Day 1's theoretical questions are:

1. Find the Scala API
2. Find a comparison of Java and Scala
3. Find a discussion of "val" vs "var"

My answers to these are:

1. [http://www.scala-lang.org/api/current/](http://www.scala-lang.org/api/current/)
2. [https://www.toptal.com/scala/why-should-i-learn-scala](https://www.toptal.com/scala/why-should-i-learn-scala)
3. [http://www.scala-lang.org/old/node/5367](http://www.scala-lang.org/old/node/5367)

Finally, we get to move on to the practical assignment for the week. For the assignment, I have to create a "Tic-tac-toe" game for 2 players.

Writing this game has been really interesting. I tried using as few variables as possible and I tried to use Scala-specific features. One of these features I have already fallen in love with: collections. Scala collections have methods similar to [LINQ in c#](https://msdn.microsoft.com/en-us/library/bb397933.aspx) and they are extremely useful. Examples of these collection methods can be found in the "boardHasWinner" method in the code below.

The complete code for this game, including the bonus problem, can also be found at [Github](https://github.com/Mastermindzh/Seven-Languages-in-Seven-Weeks/blob/master/Scala/Day%201/Self-Study/day1.scala).

```scala
object TicTacToe {

  var currentPlayer = 'X';
  val playerOne = 'X'
  val playerTwo = 'O'


  val board = Array(
    Array('_', '_', '_'),
    Array('_', '_', '_'),
    Array('_', '_', '_')
  )

  /**
    * Flips current player to the other player.
    */
  def flipPlayers = {
    if(currentPlayer.equals(playerOne)){
      currentPlayer = playerTwo
    }else{
      currentPlayer = playerOne
    }
  }

  /**
    * read user input and play a move
    * @param error set to true if user made a mistake and has to re-enter his position
    */
  def readLine(error : Boolean = false) : Unit = {
    if(error){
      System.err.println("Please enter a value ON the grid which has no mark yet.")
    }

    println("Please enter the x position you want to place your mark at")
    val x = scala.io.StdIn.readLine().toInt

    println("Please enter the y position you want to place your mark at")
    val y = scala.io.StdIn.readLine().toInt

    if((x > 0 && x < 4) && (y > 0 && y < 4) ){
      play(x,y)
    }else{
      readLine(true)
    }
  }

  /**
    * checks whether pos(x,y) is a valid position
    * if it's valid it will put currentPlayer on that position
    * if it isn't it will ask the user for new input using the readLine method
    * @param x coordinate
    * @param y coordinate
    */
  def play(x : Int, y : Int) = {
    if(board(x - 1)(y - 1).equals('_')){
      board(x - 1)(y - 1) = currentPlayer
      flipPlayers
    }else{
     readLine(true)
    }
  }

  /**
    * Checks whether the board is full
    * @return true if board is full, else false
    */
  def boardIsFull : Boolean = {
    board.foreach { row =>
        // if any row contains an underscore we're obv not full yet so we can return false;
        if(row contains '_'){
          return false;
        }

    }
    return true;
  }

  /**
    * main game loop
    */
  def run = {
    while(!boardIsFull && !boardHasWinner){
      printBoard
      readLine()
      if(boardHasWinner){
        flipPlayers // reverse last player flip
        println("Congrats " + currentPlayer + " you have won this game of Tic-Tac-Toe")
      }
    }
    if(!boardHasWinner){
      println("Sorry, it's a draw!")
    }
    // print the board once more so the players can see the final score
    printBoard
    // exit execution
    System.exit(0)
  }

  /**
    * Checks whether the board has a winner
    * @return true if board has a winner else false.
    */
  def boardHasWinner : Boolean = {

    //check horizontals
    board.foreach {row =>
      if(row(0) != '_' && row.forall(c => c.equals(row(0)))){
        return true
      }
    }

    // check diagonals
    val topLeftBottomRight = Array(board(0)(0), board(1)(1), board(2)(2))
    val bottomLeftTopRight = Array(board(0)(2), board(1)(1), board(2)(0))

    if(topLeftBottomRight(0) != '_' && topLeftBottomRight.forall(c => c.equals(topLeftBottomRight(0)))){
      return true
    }
    if(bottomLeftTopRight(0) != '_' && bottomLeftTopRight.forall(c => c.equals(bottomLeftTopRight(0)))){
      return true
    }
    // if no winner has been found, return false.
    return false
  }

  /**
    * Prints a visual representation of the board and who's turn it is
    */
  def printBoard = {
    board.foreach { row => println("" + row(0) + " | "
      + row(1) + " | "
      + row(2) )}

    println(currentPlayer + " is playing")
  }

}

// let's play!
TicTacToe.run
```
