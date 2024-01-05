/** @type {import('next').NextConfig} */
const nextConfig = {
  // config options
  // 개발 환경에서 console.log 두 번 찍히는 것 방지
  reactStrictMode: false,
}

module.exports = nextConfig

// phase : 설정이 세팅되는 환경을 가지고 있다. phase를 사용하면, 개발환경인지 배포 환경인지를 분기하는 것이 가능.
