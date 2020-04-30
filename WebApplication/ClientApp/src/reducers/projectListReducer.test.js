import {projectListReducer, initialState, getActiveProject} from './projectListReducers';
import {updateProjectList, updateActiveProject} from '../actions/projectListActions';
import { updateParameters } from '../actions/parametersActions';

describe('projectList reducer', () => {
    test('should return the initial state', () => {
        expect(projectListReducer(undefined, {})).toEqual(initialState);
    })

    test('handles empty project list', () => {
        expect(projectListReducer(initialState, updateProjectList([]))).toEqual({"activeProjectId": null, "projects": []});
    })

    it('handles new project list', () => {
        const projectList = [
            {
                id: '7',
                label: 'New Project',
                image: 'new_image.png',
                svf: 'aaa111'
            },
            {
                id: '5',
                label: 'New Project B',
                image: 'new_image_B.png',
                svf: 'bbb222'
            }            
        ]

        const expectedResult = {
            activeProjectId: '7',
            projects: projectList
        }

        expect(projectListReducer(initialState, updateProjectList(projectList))).toEqual(expectedResult);
     })
     
     it('handles active project selection', () => {
        const secondProjectActive = { ...initialState, activeProjectId: '2'};

        expect(projectListReducer(initialState, updateActiveProject('2'))).toEqual(secondProjectActive);
     })

     it('keeps active project during project list update', () => {
         const secondProjectActive = { ...initialState, activeProjectId: '2' };

         // new data that include also the current active project
         const newList = [
            {
                id: '3',
                label: 'Local Project 3',
                image: 'bike.png',
                svf: 'aaa111'
            },
            {
                id: '2',
                label: 'Another Local One',
                image: 'logo.png',
                svf: 'bbb222'
            }
        ]

         const expectedResult = {
            activeProjectId: '2',
            projects: newList
        }

        expect(projectListReducer(secondProjectActive, updateProjectList(newList))).toEqual(expectedResult);
     })

     it('correctly selects active project', () => {
        const activeProject = {
            id: '2',
            svf: 'bbb222'
        }

        const firstProject = {
            id: '3',
            svf: 'aaa111'
        }

        const projects = [
            firstProject,
            activeProject
        ]

         const projectList = {
            activeProjectId: '2',
            projects: projects
        }
        
        expect(getActiveProject(projectList)).toEqual(activeProject);
     })

     it('adds project parameters', () => {
        const projects = [
            {
                id: '7',
                label: 'New Project'
            },
            {
                id: '5',
                label: 'New Project B'               
            }            
        ]

        const newParams = [
            {
                "name": "Length",
                "value": "12000 mm",
                "type": "NYI",
                "units": "mm",
                "allowedValues": []
            },
            {
                "name": "Width",
                "value": "2000 mm",
                "type": "NYI",
                "units": "mm",
                "allowedValues": []
            }
        ]

        const oldProjectList = {
            activeProjectId: '7',
            projects: projects
        }

        const updatedProjects = [
            {
                id: '7',
                label: 'New Project',
                parameters: newParams
            },
            {
                id: '5',
                label: 'New Project B'               
            }            
        ]

        const newProjectList = {
            activeProjectId: '7',
            projects: updatedProjects
        }

        expect(projectListReducer(oldProjectList, updateParameters('7', newParams))).toEqual(newProjectList);
     })

     it('updates  project parameters', () => {
        const projects = [
            {
                id: '7',
                label: 'New Project',
                parameters: [
                    {
                        "name": "oldParameter",
                        "value": null
                    }
                ]
            },
            {
                id: '5',
                label: 'New Project B'               
            }            
        ]

        const newParams = [
            {
                "name": "Length",
                "value": "12000 mm",
                "type": "NYI",
                "units": "mm",
                "allowedValues": []
            },
            {
                "name": "Width",
                "value": "2000 mm",
                "type": "NYI",
                "units": "mm",
                "allowedValues": []
            }
        ]

        const oldProjectList = {
            activeProjectId: '7',
            projects: projects
        }

        const updatedProjects = [
            {
                id: '7',
                label: 'New Project',
                parameters: newParams
            },
            {
                id: '5',
                label: 'New Project B'               
            }            
        ]

        const newProjectList = {
            activeProjectId: '7',
            projects: updatedProjects
        }

        expect(projectListReducer(oldProjectList, updateParameters('7', newParams))).toEqual(newProjectList);
     })

})