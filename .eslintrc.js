module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:vue/vue3-essential",
        'plugin:vue/vue3-strongly-recommended',
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "ecmaFeatures": {
          "modules": true
        }
    },
    "plugins": [
        "vue"
    ],
    "rules": {
      "semi": ["warn","never"]
    }
}
