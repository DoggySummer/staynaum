import mysql, { ServerlessMysql } from "serverless-mysql"
import { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2"

// 데이터베이스 설정 타입 정의
interface DbConfig {
  host: string
  port: number
  database: string
  user: string
  password: string
}

// 쿼리 실행 함수의 매개변수 타입 정의
interface QueryParams {
  query: string
  values?: any[]
}

// 데이터베이스 설정
const dbConfig: DbConfig = {
  host: process.env.MYSQL_HOST!,
  port: parseInt(process.env.MYSQL_PORT!, 10),
  database: process.env.MYSQL_DATABASE!,
  user: process.env.MYSQL_USER!,
  password: process.env.MYSQL_PASSWORD!,
}

// serverless-mysql 인스턴스 생성
const db: ServerlessMysql = mysql({
  config: dbConfig,
})

// 쿼리 실행 함수
export async function executeQuery<
  T extends
    | RowDataPacket[][]
    | RowDataPacket[]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader
>({ query, values }: QueryParams): Promise<T> {
  try {
    const results = await db.query<T>(query, values)
    await db.end()
    return results
  } catch (error) {
    throw error
  }
}

// 데이터베이스 연결 종료 함수
export async function closeConnection() {
  await db.end()
}
