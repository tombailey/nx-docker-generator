# nx-docker-generator

A simple workspace generator for [NX](https://nx.dev/) to generate docker projects.

## Usage

In the root of your nx monorepo:

```shell
git clone https://github.com/tombailey/nx-docker-generator ./tools/generators/docker
nx workspace-generator docker my-project
```

You'll want to edit `Dockerfile` to include your build steps and `project.json` to use different image tags, map container/host ports when running, etc.
