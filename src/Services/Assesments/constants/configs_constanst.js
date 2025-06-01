import LOGOS_URL from "./logos_url_constants.js";

const ASSESSMENT_LINKS = {
  BRANCH_SELECTION_UG: '/assessments/branch-selection',
  BRANCH_SELECTION_RESULT_UG: '/assessments/branch-selection-result',
  RESUME_CHECK: '/assessments/resume-check',
  RESUME_CHECK_RESULT: '/assessments/resume-check-results',
}

const ASSESSMENT_CONFIG = [
  {
    id: 1,
    title: 'Engineering Branch Selection',
    image: LOGOS_URL.BRANCH_SELECTION,
    link: ASSESSMENT_LINKS.BRANCH_SELECTION_UG,
  },
  {
    id: 2,
    title: 'Resume Checklist',
    image: LOGOS_URL.RESUME_CHECKLIST,
    link: ASSESSMENT_LINKS.RESUME_CHECK,
  }
  // Add more assessments here as needed
];

export { ASSESSMENT_CONFIG, ASSESSMENT_LINKS };