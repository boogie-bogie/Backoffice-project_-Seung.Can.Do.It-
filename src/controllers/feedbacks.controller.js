export class FeedbacksController {
  constructor(feedbacksService) {
    this.feedbacksService = feedbacksService;
  }

  findAllFeedback = async (req, res, next) => {
    try {
      const { taskId } = req.params;

      await this.feedbacksService.findTask(taskId);
      const feedback = await this.feedbacksService.findAllFeedback(taskId);

      return res.status(200).json({data: feedback});

    } catch(err) {
      next(err);
    }
  }

  findFeedback = async (req, res, next) => {
    try {
      const { feedbackId } = req.params;

      const feedback = await this.feedbacksService.findFeedback(feedbackId);

      return res.status(200).json({data: feedback})

    } catch(err) {
      next(err);
    }
  }

  createFeedback = async (req, res, next) => {
    try{
      const { taskId } = req.params;
      const {title, content, rating} = req.body;
      const { userId } = req.user;

      await this.feedbacksService.findTask(taskId);
      await this.feedbacksService.createFeedback(
        taskId,
        title,
        content,
        rating,
        userId
      );

      return res.status(201).json({success: 'true', message: '피드백을 작성하였습니다.'});

    } catch(err) {
      next(err);
    }
  }

  editFeedback = async (req, res, next) => {
    try{
      const { feedbackId } = req.params;
      const {title, content, rating} = req.body;
      const { userId } = req.user;

      await this.feedbacksService.findFeedback(feedbackId);

      const feedback = await this.feedbacksService.editFeedback(
        feedbackId,
        title,
        content,
        rating,
        userId
      );

      return res.status(200).json({success: 'true', message: '피드백을 수정했습니다.', data: feedback});

    } catch(err) {
      next(err);
    }
  }

  deleteFeedback = async (req, res, next) => {
    try{
      const { feedbackId } = req.params;
      const { userId } = req.user;

      await this.feedbacksService.findFeedback(feedbackId);

      const feedback = await this. feedbacksService.deleteFeedback(
        feedbackId,
        userId
      );

        return res.status(204).json({success: 'true', message: '피드백을 삭제했습니다.'});
        
    } catch(err) {
      next(err);
    }
  }
}
