import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  addProjectConfiguration
} from "@nrwl/devkit"
import * as path from "path"

export default async function (tree: Tree, schema: any) {
  await generateFiles(
    tree,
    path.join(__dirname , "files"),
    `./packages/${schema.name}`,
    {}
  );

  addProjectConfiguration(
    tree,
    schema.name,
    {
      root: `packages/${schema.name}`,
      projectType: "application",
      targets: {
        build: {
          executor: "nx:run-commands",
          options: {
            commands: [
              `docker build . -f ./packages/${schema.name}/Dockerfile -t ${schema.name}`
            ]
          },
        },
        push: {
          executor: "nx:run-commands",
          options: {
            commands: [
              `docker build . -f ./packages/${schema.name}/Dockerfile -t ${schema.name}`
            ]
          },
          dependsOn: [
            {
              projects: "self",
              target: "build"
            }
          ]
        },
        run: {
          executor: "nx:run-commands",
          options: {
            commands: [
              `docker run -it ${schema.name}`
            ]
          },
          dependsOn: [
            {
              projects: "self",
              target: "build"
            }
          ]
        }
      }
    }
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
