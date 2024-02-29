import express from "express";

/**PrismaORM -> 3계층 의존성 주입 */
import { prisma } from "../models/index.js";
import { ProjectsRepository } from "../repositories/projects.repository.js";
import { ProjectsService } from "../services/projects.service.js";
import { ProjectsController } from "../controllers/projects.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { TasksService } from "../services/tasks.service.js";
import { TasksRepository } from "../repositories/tasks.repository.js";

const router = express.Router();

/**인스턴스 생성 */
const tasksRepository = new TasksRepository(prisma);
const tasksService = new TasksService(tasksRepository);
const projectsRepository = new ProjectsRepository(prisma);
const projectsService = new ProjectsService(projectsRepository);
const projectsController = new ProjectsController(projectsService, tasksService);

// 프로젝트 생성, 조회, 수정, 삭제
router.get("/submit", authMiddleware, projectsController.getAllNotSubmitUser);
router.get("/", authMiddleware, projectsController.getAllProjects);
router.get(
  "/:projectId",
  authMiddleware,
  projectsController.getProjectByProjectId,
);
router.post("/", authMiddleware, projectsController.createProject);
router.put("/:projectId", authMiddleware, projectsController.updateProject);
router.delete("/:projectId", authMiddleware, projectsController.deleteProject);

export default router;
