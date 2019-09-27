import { ID } from '@datorama/akita';

export interface Project {
  id: ID;
  code: string;
  name: string;
  responsable: string;
  tecnicResponsable: string;
  department: string;
  codeINAP: string;
  teamSize: number;
  responsive: boolean;
  mobileApp: boolean;
  dblink: boolean;
  webservice: boolean;
  database: number;
  ldap: boolean;
  minBrowser: string;
  accessLogs: number;
  deployFrequency: number;
  repositorySIC: number;
  repositoryIndra: number;
  automaticDeploy: boolean;
  netFramework: string;
  netIde: number;
  netEntityFramework: boolean;
  javaIde: number;
  javaCanigoVersion: string;
  javaFramework: string;
  jsIde: number;
  jsAngular: boolean;
  jsAngularJS: boolean;
  jsTypescript: boolean;
  gicar: boolean;
  valid: boolean;
  pica: boolean;
  ecopia: boolean;
  sarcat: boolean;
  smtp: boolean;
  problems: string;
}

/**
 * A factory function that creates Projects
 */
export function createProject(params: Partial<Project>) {
  return {} as Project;
}
