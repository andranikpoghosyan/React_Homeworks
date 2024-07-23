import Database from "better-sqlite3";

export interface ICourse {
  id: number;
  name: string;
  price: number;
  cover: string;
  duration: number;
  modules?: IModule[];
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export type InputCourse = Omit<ICourse, "id">;
export type CourseWithout = Omit<InputCourse, "cover">;
export type InputModule = Omit<IModule, "id">;

const db = new Database("courses.db");

export const addCourse = (course: InputCourse) => {
  db.prepare(
    `
            INSERT INTO courses(name, price, cover, duration)
            VALUES(@name, @price, @cover, @duration)
    `
  ).run(course);
};

export const getAllCourses = (): ICourse[] => {
  const result = (db.prepare("SELECT * FROM courses").all() as ICourse[]).map(
    (course) => ({
      ...course,
      modules: db
        .prepare("SELECT * FROM modules where courseId=?")
        .all(course.id) as IModule[],
    })
  );
  return result;
};

export const getCourseById = (id: number): ICourse => {
  return db.prepare("SELECT * FROM courses where id = ?").get(id) as ICourse;
};

export const updateCourseById = (id: number, course: CourseWithout) => {
  return db
    .prepare("UPDATE courses set name=?,duration=?, price=? WHERE id = ?")
    .run(course.name, course.duration, course.price, id);
};

export interface IModule {
  id: number;
  name: string;
  duration: number;
  courseId: number;
}

export const addModuleDb = (obj: InputModule): Database.RunResult => {
  return db
    .prepare(
      `
      INSERT INTO modules(name, duration, courseId)
      values(@name, @duration, @courseId)
  `
    )
    .run(obj);
};

export const getAllCoursesBeta = () => {
  return db
    .prepare(
      `SELECT courses.*,modules.name, modules.duration FROM courses
      JOIN modules on modules.courseId = courses.id`
    )
    .all();
};

export const deleteCourseById = (id: number) => {
  db.prepare("DELETE FROM courses WHERE id = ?").run(id);
};
