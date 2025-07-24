module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),  // ✅ 반드시 이렇게 바꿔야 합니다.
    require('autoprefixer'),
  ],
};