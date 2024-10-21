[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bzPrOe11)

# CS3219 Project (PeerPrep) - AY2425S1

## Group: G08

## CI/CD Pipeline

This repository uses GitHub Actions to automate the following tasks:

- **Linting**:

  | Language               | Linter                                                                                                                                                   |
  | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Java                   | [checkstyle](https://checkstyle.org/)                                                                                                                    |
  | JavaScript, TypeScript | [ESLint](https://eslint.org/)                                                                                                                            |
  | JSX, TSX               | [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) |

The workflow files can be found in the `.github/workflows/` directory.
<br><br>

## Running the Linter Locally

To ensure code quality and consistency, we use Super-Linter. You can run the linter locally using the provided scripts:

### On Unix-like systems (macOS, Linux):

bash

```
./run-linter.sh
```

### On Windows:

batch

```
run-linter.bat
```

Make sure you have Docker installed and running on your system before executing these commands.
The linter is configured to check for:

- JavaScript (ES)
- TypeScript (ES)
- JSX
- TSX
- Java
  <br><br>

### Note:

- You can choose to develop individual microservices within separate folders within this repository **OR** use individual repositories (all public) for each microservice.
- In the latter scenario, you should enable sub-modules on this GitHub classroom repository to manage the development/deployment **AND** add your mentor to the individual repositories as a collaborator.
- The teaching team should be given access to the repositories as we may require viewing the history of the repository in case of any disputes or disagreements.
