// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-building-deep-neural-networks-from-scratch",
        
          title: "Building Deep Neural Networks from Scratch",
        
        description: "Training of neural networks on the MNIST dataset using only NumPy",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/mnist/";
          
        },
      },{id: "post-controls-for-a-2d-rocket",
        
          title: "Controls for a 2D Rocket",
        
        description: "LQG and model predictive control of a rocket for hovering, landing, and waypoint flight",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/2drocket/";
          
        },
      },{id: "post-prosthetic-leg",
        
          title: "Prosthetic Leg",
        
        description: "Requirement analysis and design of a knee prosthesis concept",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/prosthesis/";
          
        },
      },{id: "post-nonlinear-control-of-a-dc-motor",
        
          title: "Nonlinear Control of a DC Motor",
        
        description: "Control system design using Lyapunov stability and sliding manifolds",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/nonlinear-controls/";
          
        },
      },{id: "post-basic-and-optimal-control-of-a-double-pendulum",
        
          title: "Basic and Optimal Control of a Double Pendulum",
        
        description: "Control system design using pole placement, linear quadratic regulator, and Kalman filter",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/pendulum/";
          
        },
      },{id: "post-system-identification-of-a-dc-motor",
        
          title: "System Identification of a DC Motor",
        
        description: "White- and black-box approaches to motor dynamics",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/sys-id/";
          
        },
      },{id: "post-iot-christmas-tree",
        
          title: "IoT Christmas Tree",
        
        description: "Coordinate- and sensor-based Christmas tree lighting",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/xmas-tree/";
          
        },
      },{id: "post-gwu-mae-senior-capstone",
        
          title: "GWU MAE Senior Capstone",
        
        description: "Design and build of a maritime spotlight",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/capstone/";
          
        },
      },{id: "post-object-tracking-and-identification",
        
          title: "Object Tracking and Identification",
        
        description: "Pocket-sized computer vision (Raspberry Pi/OpenCV)",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/opencv/";
          
        },
      },{id: "post-mini-foosball-table",
        
          title: "Mini Foosball Table",
        
        description: "Design, manufacturing, and assembly of a scaled-down foosball table",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/foosball/";
          
        },
      },{id: "post-wavelength-calibration-for-hubble-space-telescope",
        
          title: "Wavelength Calibration for Hubble Space Telescope",
        
        description: "R&amp;D of a new calibration routine for the Cosmic Origins Spectrograph",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/stsci/";
          
        },
      },{id: "post-deformation-of-a-wing",
        
          title: "Deformation of a Wing",
        
        description: "Stress analysis of an airplane wing",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/aerostructures/";
          
        },
      },{id: "news-started-my-bachelor-s-degree-at-the-george-washington-university-in-washington-dc-sparkles-smile",
          title: 'Started my bachelor’s degree at The George Washington University in Washington, DC! :sparkles:...',
          description: "",
          section: "News",},{id: "news-first-day-at-pennsylvania-department-of-transportation-as-a-summer-intern",
          title: 'First day at Pennsylvania Department of Transportation as a summer intern. 🚙🚃',
          description: "",
          section: "News",},{id: "news-began-study-abroad-semester-at-the-university-of-new-south-wales-in-sydney-australia",
          title: 'Began study abroad semester at the University of New South Wales in Sydney,...',
          description: "",
          section: "News",},{id: "news-first-day-as-instruments-intern-with-space-telescope-science-institute-telescope",
          title: 'First day as Instruments Intern with Space Telescope Science Institute! :telescope:🪐',
          description: "",
          section: "News",},{id: "news-presented-poster-on-cosmic-origins-spectrograph-cross-correlation-wavelength-calibration-at-aas-243-in-new-orleans-la",
          title: 'Presented poster on Cosmic Origins Spectrograph cross-correlation wavelength calibration at AAS 243 in...',
          description: "",
          section: "News",},{id: "news-began-training-in-ai-ml-as-an-undergraduate-research-assistant-with-the-intelligent-aerospace-systems-lab-at-gw-️-cloud",
          title: 'Began training in AI/ML as an undergraduate research assistant with the Intelligent Aerospace...',
          description: "",
          section: "News",},{id: "news-graduated-summa-cum-laude-from-gw-earning-my-bachelor-s-degree-tada",
          title: 'Graduated summa cum laude from GW, earning my bachelor’s degree! 🎆:tada:',
          description: "",
          section: "News",},{id: "news-started-my-master-s-degree-at-gw",
          title: 'Started my master’s degree at GW! 📓🤖',
          description: "",
          section: "News",},{id: "news-first-day-as-graduate-teaching-assistant-for-the-cad-lab-mae-1004-at-gw-️-gear",
          title: 'First day as Graduate Teaching Assistant for the CAD Lab (MAE 1004) at...',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
