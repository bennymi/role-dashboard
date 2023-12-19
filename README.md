# Role Dashboard

## Setting up the project

Install the dependencies with `pnpm install` and start the development server:

```bash
pnpm run dev
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

## Problem Statement

The given system uses a permission-based access control system. Each user has a role containing a subset (0...n) of the available permissions.

To configure the roles, a user interface with the following requirements should be developed:
- As a user, I want to see the available roles together with their permissions.
- As a user, I want to be able to change the permissions of a role.

### Task

Design and develop a (web) user interface that implements (at least) the given requirements in
production-ready quality.
- Use the provided mocked service.
- Use technologies, frameworks, component libraries, etc. of your choice.
- The language shall be TypeScript.
- Extensions are welcome but not necessary.
