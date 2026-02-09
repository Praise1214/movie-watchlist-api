import type {Request, Response} from "express";
import {prisma} from "../config/db";

const addToWatchList = async (req:Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const {movieId, status, rating, notes} = req.body;

    //Verify movie exists
    const movie = await prisma.movie.findUnique({
      where: {id: movieId}
    })
    if(!movie) {
      return res
      .status(404)
      .json({error: "Movie not Found"})
    }

    //check if already added
    const existingWatchList = await prisma.watchListItem.findUnique({
      where: {
        userId_movieId : {
          userId: req.user.id,
          movieId: movieId,
        }
      }
    })
    if(existingWatchList) {
      return res.status(400).json({error: "Movie already in the watchList"})
    }

    const watchListItem = await prisma.watchListItem.create({
      data: {
        userId: req.user.id,
        movieId,
        status: status || "PlANNED",
        rating,
        notes,
      }
    })

    res
    .status(201)
    .json({
      status: "success",
      data: {watchListItem}
    })
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export {addToWatchList};