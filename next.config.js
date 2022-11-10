/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "@fullcalendar/list",
  '@fullcalendar/resource-timeline',
  '@fullcalendar/timeline'
]);


module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
})