module.exports = {
  extends: ["@commitlint/cli", "@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "ui",
        "fix",
        "docs",
        "style",
        "refactor",
        "pref",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "subject-case": [0, "never"],
  },
};
