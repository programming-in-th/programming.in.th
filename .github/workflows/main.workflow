workflow "Build and deploy on push" {
  resolves = [
    "Deploy to Firebase",
  ]
  on = "push"
}

action "Install" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Build" {
  uses = "nuxt/actions-yarn@master"
  args = "build"
  needs = ["Install"]
}

action "Deploy to Firebase" {
  uses = "w9jds/firebase-action@master"
  needs = ["Build"]
  args = "deploy --only hosting"
  secrets = ["FIREBASE_TOKEN"]
}
