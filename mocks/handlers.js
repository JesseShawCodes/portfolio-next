// mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('*/work-experiences', () => {
    return HttpResponse.json({
        data: [
            {
                title: 'Senior Web Developer',
                company: 'Test Company',
                startdate: '2022-01-01',
                enddate: '2023-01-01',
                description: 'Test description',
                technologies: ['React', 'Node.js'],
            },
        ],
    })
  }),
  http.get('*/educations', () => {
    return HttpResponse.json({
        data: [
            {
                schoolName: 'Test University',
                degree: 'Master of Science',
                field: 'Computer Science',
                startDate: '2020-09-01',
                endDate: '2022-05-01',
            },
        ],
    })
  }),
]
