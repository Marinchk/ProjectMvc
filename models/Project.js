class Project {
  static projectList = [];

  constructor(name, description, users) {
      this.name = name;
      this.description = description;
      this.users = users;
  }

  static validate(project) {
      const isNameValid = project.name.trim().length > 0;
      const isDescriptionValid = project.description.length > 10;
      return isNameValid && isDescriptionValid;
  }

  static addProject(project) {
      if (this.validate(project)) {
          this.projectList.push(project);
          return project;
      } else {
          throw new Error("Invalid project data");
      }
  }

  static findById(id) {
      return this.projectList[id];
  }

  static updateProject(id, name, description, users) {
      let project = this.findById(id);
      if (project && this.validate(new Project(name, description, users))) {
          project.name = name;
          project.description = description;
          project.users = users;
          return project;
      } else {
          throw new Error("Invalid project data or project not found");
      }
  }

  static deleteProject(id) {
      if (this.findById(id)) {
          this.projectList.splice(id, 1);
          return true;
      } else {
          throw new Error("Project not found");
      }
  }
}

module.exports = Project;
