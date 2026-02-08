import type { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  const body = req.body
  res.json(body)
}
export {register}