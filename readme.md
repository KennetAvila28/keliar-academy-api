# Keliar Academy API

A educative plaform with whatsapp and emaill notifications.

# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]

## [1.0.1] - 2022-03-14
### Added
- Add SetActiveUser method
- Add User Filters
## [1.0.0] - 2022-03-12
### Added
- New name regex expressison
- New email regex expression
- Add names, lastNames, phone, photo isArchived and isActive columns to users table
- New AuthTypes
- Value objects validators
- Add changelog

### Changed
- The uniqueId class, now have a validator
- Refactor the static methods to create a new instance of user
- Rename GetUser to GetUsers
- The user value objects are now implements value object validators
- The CreateUser method of UsersController, now return a user primitives properties