
export interface Ireport {
  id: number;
  name: string;
  content: string;
  author: string;
  tags:string[];

}
export const reportsData : Ireport[] = [
    {
      id: 1010,
     name: "5 Best practices for a React Project.",
      content:
        " You might have seen in lot of youtube videos of react project how the tutor mention the practice of keeping the component in different folder called Components.",
      author: "Vipin Chandra",
      tags:['#typescript'],
      // imageURL:'https://res.cloudinary.com/practicaldev/image/fetch/s--W2sx7OMb--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gjdnju0qrmpagw6llmoz.png',
      // date:new Date('2019-01-01'),
 
    },
    {
      id: 3,
      name: "My VS Code setting for Web Development in 2022",
      content:
        "After using VS Code for the last 5–6 years, I've tried tons of customization and setup in my Editor. No doubt VS code is expensive in terms of its memory usage of the system but with lots of features and being a Developer centric Editor it's worth trying.",
      // imageURL:'https://res.cloudinary.com/practicaldev/image/fetch/s--W2sx7OMb--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gjdnju0qrmpagw6llmoz.png',
      // date:new Date('2019-01-01'),
      author: "Rishav Pandey",
      tags:['#typescript'],
    
    },
    {
      id: 13,
     name: "What is React?",
      content:
        "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug. We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code",
      author: "Anas Nabil",
      tags:['#typescript'],
      // imageURL:'https://res.cloudinary.com/practicaldev/image/fetch/s--W2sx7OMb--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gjdnju0qrmpagw6llmoz.png',
      // date:new Date('2019-01-01'),

    },
    {
      id: 104,
     name: "useEffect firing twice in React 18",
      author: "Shivam Jha.",
      tags:['#typescript'],
      content:
        "In the future, React will provide a feature that lets components preserve state between unmounts. To prepare for it, React 18 introduces a new development-only check to Strict Mode. React will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount. If this breaks your app, consider removing Strict Mode until you can fix the components to be resilient to remounting with the existing state.",
      // imageURL:'https://res.cloudinary.com/practicaldev/image/fetch/s--W2sx7OMb--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gjdnju0qrmpagw6llmoz.png',
      // date:new Date('2019-01-01'),
  
    },
  ];
  