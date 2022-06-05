export class ChangeLessonStatusRequest {
  public lessonId: number;
  public semesterId: number;
  public teacherId: number;
  public status: string;
  public message: string;

  constructor(lessonId: number, semesterId: number, teacherId: number, status: string, message: string) {
    this.lessonId = lessonId;
    this.semesterId = semesterId;
    this.teacherId = teacherId;
    this.status = status;
    this.message = message;
  }
}
