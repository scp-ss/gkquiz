const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const resultsContainer = document.getElementById('results-container');
const resultsElement = document.getElementById('results');
const totalTimeElement = document.getElementById('total-time');
const avgTimeElement = document.getElementById('avg-time');
const questionTimesElement = document.getElementById('question-times');
const timerElement = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex, startTime, questionStartTimes = [];
let correctAnswers = 0;
let incorrectAnswers = 0;
let skippedQuestions = 0;
let questionTimes = [];
let questionTimerInterval;
let answeredQuestions = [];
let skippedQuestionsList = []; // Track skipped question indexes

const questions = [
    {
        question: '2024 was a leap year.',
        options: ['TRUE', 'FALSE', 'Maybe', 'Not Sure'],
        answer: 'TRUE'
    },
    {
        question: 'How many seconds are in 1 hour?',
        options: ['360', '3600', '4800', '480'],
        answer: '3600'
    },
    {
        question: 'The protective layer around plant parts is ___?',
        options: ['Epidermis', 'Cortex', 'Mesophyll', 'Vascular bundle'],
        answer: 'Epidermis'
    },
    {
        question: 'Table salt is called ___?',
        options: ['Sodium chloride', 'Sulphur', 'Hydrochloric acid', 'Magnesium Oxide'],
        answer: 'Sodium chloride'
    },
    {
        question: 'Fahrenheit is a unit of ___?',
        options: ['Sound', 'Electricity', 'Temperature', 'Length'],
        answer: 'Temperature'
    },
    {
        question: 'The objects that do not allow all light rays to travel through them are ___ objects.',
        options: ['Opaque', 'Translucent', 'Transparent', 'Reflective'],
        answer: 'Opaque'
    },
    {
        question: 'How many poles are there in a ring-shaped magnet?',
        options: ['2', '3', '4', '6'],
        answer: '2'
    },
    {
        question: 'Current can easily pass through ___?',
        options: ['A steel paper clip', 'A glass strip', 'A plastic comb', 'A wooden spoon'],
        answer: 'A steel paper clip'
    },
    {
        question: 'Rusting can be prevented by ___?',
        options: ['Scratching', 'Painting', 'Washing', 'Cleaning'],
        answer: 'Painting'
    },
    {
        question: '___ travels in a straight line.',
        options: ['Light', 'Sound', 'Line', 'None of these'],
        answer: 'Light'
    },
    {
        question: 'Neutrons carry ___?',
        options: ['No electric charge', 'Positive charge', 'Negative charge', 'Unit charge'],
        answer: 'No electric charge'
    },
    {
        question: 'A leap year comes after every four years.',
        options: ['Yes', 'No', 'Sometimes', 'Never'],
        answer: 'Yes'
    },
    {
        question: '1 mile is equal to ___ km.',
        options: ['0.6', '1.6', '2.6', '3.6'],
        answer: '1.6'
    },
    {
        question: 'The purpose of respiration in plants is to ___?',
        options: ['Prepare food', 'Release energy', 'Absorb energy', 'Maintain healthy growth'],
        answer: 'Release energy'
    },
    {
        question: 'The national flower of Pakistan is ___?',
        options: ['Rose', 'Jasmine', 'Lilly', 'Defodil'],
        answer: 'Jasmine'
    },
    {
        question: 'To measure atmospheric pressure, we use a ___?',
        options: ['Thermometer', 'Barometer', 'Machine', 'Ruler'],
        answer: 'Barometer'
    },
    {
        question: 'There are ___ types of kingdoms.',
        options: ['7', '5', '6', '4'],
        answer: '5'
    },
    {
        question: 'A freely suspended bar magnet always stays along the ___ direction.',
        options: ['The east-west direction', 'The North-south direction', 'Any direction', 'The up-down direction'],
        answer: 'The North-south direction'
    },
    {
        question: 'The smallest particle of an element is ___?',
        options: ['Molecule', 'Cell', 'Atom', 'DNA'],
        answer: 'Atom'
    },
    {
        question: 'The atomic number of a hydrogen atom is one. The number of valence electrons in a hydrogen atom is ___?',
        options: ['0', '2', '1', '3'],
        answer: '1'
    },
    {
        question: 'When you divide distance by time, we obtain ___?',
        options: ['Speed', 'Mass', 'Gravity', 'Force'],
        answer: 'Speed'
    },
    {
        question: 'If a body covers equal distances in equal intervals of time, then speed will be ___?',
        options: ['Increasing', 'Decreasing', 'Uniform', 'Zero'],
        answer: 'Uniform'
    },
    {
        question: '___ is the fuel in the sun.',
        options: ['Hydrogen', 'Oxygen', 'Nitrogen', 'Calcium'],
        answer: 'Hydrogen'
    },
    {
        question: 'How many galaxies are there in the universe?',
        options: ['100 billion', '200 billion', '600 billion', '500 billion'],
        answer: '100 billion'
    },
    {
        question: 'How many total time zones are there in the world?',
        options: ['20', '22', '23', '24'],
        answer: '24'
    },
    {
        question: 'What vitamin do the sun’s ultraviolet rays help the skin produce?',
        options: ['A', 'B', 'C', 'D'],
        answer: 'D'
    },
    {
        question: 'How many eyes does a bee have?',
        options: ['2', '3', '5', '7'],
        answer: '5'
    },
    {
        question: 'Protons carry ___?',
        options: ['Positive charge', 'Negative charge', 'No charge', 'Positive and Negative charge'],
        answer: 'Positive charge'
    },
    {
        question: 'The SI unit of force is ___?',
        options: ['Kilogram', 'Centi-second', 'Meter', 'Newton'],
        answer: 'Newton'
    },
    {
        question: 'Which ___ running speed?',
        options: ['Horse', 'Turtle', 'Cheetah', 'Silver ant'],
        answer: 'Cheetah'
    },
    {
        question: '___ discovered X-rays.',
        options: ['W.C. Roentgen', 'Ekta Diwas', 'Ghetan Bhagat', 'Albert Einstein'],
        answer: 'W.C. Roentgen'
    },
    {
        question: 'When you\'re asleep, which one is the active body part?',
        options: ['Nose', 'Ear', 'Eyes', 'Arm'],
        answer: 'Ear'
    },
    {
        question: 'Which planet has the shortest day?',
        options: ['Mars', 'Jupiter', 'Venus', 'Uranus'],
        answer: 'Jupiter'
    },
    {
        question: 'Which planet is called Earth\'s twin?',
        options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
        answer: 'Venus'
    },
    {
        question: 'Which is the most coffee-producing country in the world?',
        options: ['Brazil', 'China', 'Canada', 'England'],
        answer: 'Brazil'
    },
    {
        question: 'What is the most abundant metal in the Earth\'s crust?',
        options: ['Aluminum', 'Potassium', 'Calcium', 'Magnesium'],
        answer: 'Aluminum'
    },
    {
        question: 'Where is the fastest muscle in our body?',
        options: ['Nose', 'Ear', 'Eyes', 'Brain'],
        answer: 'Eyes'
    },
    {
        question: 'Who was the first woman to win a Nobel Prize in 1903?',
        options: ['Benazir Bhutto', 'Marie Curie', 'Korine Akino', 'Rosa Parks'],
        answer: 'Marie Curie'
    },
    {
        question: 'Which country is the second-largest in the world?',
        options: ['UAE', 'China', 'Canada', 'England'],
        answer: 'Canada'
    },
    {
        question: 'Which continent has the highest population density?',
        options: ['Canada', 'Asia', 'Germany', 'Africa'],
        answer: 'Asia'
    },
    {
        question: 'What comes after a trillion?',
        options: ['Million', 'Billion', 'Lakh', 'Quadrillion'],
        answer: 'Quadrillion'
    },
    {
        question: 'Can hummingbirds fly backward?',
        options: ['Yes', 'No', 'Not at all', 'Only sometimes'],
        answer: 'Yes'
    },
    {
        question: 'The value of ___ is not fixed.',
        options: ['Variable', 'Coefficient', 'Constant', 'Exponent'],
        answer: 'Variable'
    },
    {
        question: 'The total length of the boundary of a circle is called ___?',
        options: ['Diameter', 'Base', 'Volume', 'Circumference'],
        answer: 'Circumference'
    },
    {
        question: 'To convert speed from km/h to meters per hour, multiply it by ___?',
        options: ['100', '10', '1', '1000'],
        answer: '1000'
    },
    {
        question: 'Which country has won the Cricket World Cup three times in a row?',
        options: ['Pakistan', 'India', 'Germany', 'Australia'],
        answer: 'Australia'
    },
    {
        question: 'What\'s the tallest building in the world?',
        options: ['Faisal Mosque', 'Burj Khalifa', 'Minar e Pakistan', 'Taipei 101'],
        answer: 'Burj Khalifa'
    },
    {
        question: 'Who was the first Indian woman to climb Mount Everest?',
        options: ['Edmund Hillary', 'Tenzing Norgay', 'George Mallory', 'Bachendri Pal'],
        answer: 'Bachendri Pal'
    },
    {
        question: 'During the day, the moon’s temperature is ___?',
        options: ['Higher', 'Lower', 'Medium', 'The same'],
        answer: 'Higher'
    },
    {
        question: '___ is a type of yeast.',
        options: ['Algae', 'Germ', 'Bacteria', 'Fungus'],
        answer: 'Fungus'
    },
    {
        question: 'The smallest ocean is ___?',
        options: ['Pacific', 'Atlantic', 'Indian', 'Arctic'],
        answer: 'Arctic'
    },
    {
        question: 'First T20 World Cup was won by?',
        options: ['Pakistan', 'India', 'Germany', 'Africa'],
        answer: 'India'
    },
    {
        question: 'Polynomials which contain only two terms are known as ___?',
        options: ['Monomials', 'Trinomials', 'Binomials', 'Equadrinomials'],
        answer: 'Binomials'
    },
    {
        question: 'The number of minutes in 5 hours is ___?',
        options: ['360', '180', '240', '300'],
        answer: '300'
    },
    {
        question: 'The longest chord of the circle is ___?',
        options: ['Radius', 'Diameter', 'Segment', 'Sectors'],
        answer: 'Diameter'
    },
    {
        question: 'Which of these has no line of symmetry?',
        options: ['Square', 'Rectangle', 'Rhombus', 'Parallelogram'],
        answer: 'Parallelogram'
    },
    {
        question: 'The term "algebra" means ___?',
        options: ['Joined', 'Connected', 'Distinct', 'Combined'],
        answer: 'Joined'
    },
    {
        question: 'What is the primary role of angels in Islam?',
        options: ['To punish the wicked', 'To guide humans to the right path', 'To carry out God\'s commands', 'To grant wishes to humans'],
        answer: 'To carry out God\'s commands'
    },
    {
        question: 'How many types of angels are mentioned in the Quran?',
        options: ['2', '4', '6', 'Not specified'],
        answer: 'Not specified'
    },
    {
        question: 'What is the name of the angel responsible for taking the souls of the deceased?',
        options: ['Jibril (Gabriel)', 'Mikail (Michael)', 'Izrail (Azrael)', 'Israfil'],
        answer: 'Izrail (Azrael)'
    },
    {
        question: 'Which month is fasting obligatory for Muslims?',
        options: ['Ramadan', 'Shawwal', 'Dhu al-Hijjah', 'Muharram'],
        answer: 'Ramadan'
    },
    {
        question: 'How many Takbirs are recited in Namaz-e-Janazah?',
        options: ['4', '3', '5', '6'],
        answer: '4'
    },
    {
        question: 'What is the Islamic term for fasting?',
        options: ['Zakat', 'Hajj', 'Sadaqah', 'Sawm'],
        answer: 'Sawm'
    },
    {
        question: 'Who leads the Namaz-e-Janazah?',
        options: ['The Imam of the mosque', 'A senior member of the community', 'A close relative of the deceased', 'Any Muslim can lead'],
        answer: 'Any Muslim can lead'
    },
    {
        question: 'What is the Arabic term for prayer in Islam?',
        options: ['Namaz', 'Salat', 'Zakat', 'Hajj'],
        answer: 'Salat'
    },
    {
        question: 'The Olympic Council of Asia was formed in ___?',
        options: ['1980', '1981', '1982', '1983'],
        answer: '1982'
    },
    {
        question: 'A line of symmetry divides the symmetric shape into ___?',
        options: ['Quarters', 'Halves', 'Thirds', 'Fourths'],
        answer: 'Halves'
    },
    {
        question: 'The ___ distribution means to organize the information in the form of a table.',
        options: ['Frequency', 'Pie', 'Range', 'Class interval'],
        answer: 'Frequency'
    },
    {
        question: 'Which angel is responsible for bringing revelation from God to the Prophets?',
        options: ['Jibril (Gabriel)', 'Mikail (Michael)', 'Israfil', 'Azrael'],
        answer: 'Jibril (Gabriel)'
    },
    {
        question: 'What is the meaning of Akhira in Islam?',
        options: ['Life in this world', 'Life after death', 'The Day of Judgment', 'The Quran'],
        answer: 'Life after death'
    },
    {
        question: 'What is the meaning of Dua in Islam?',
        options: ['Prayer', 'Fasting', 'Charity', 'Supplication'],
        answer: 'Supplication'
    },
    {
        question: 'What was the main reason for the Battle of the Trench?',
        options: ['To conquer Mecca', 'To defend Madinah from the enemy', 'To attack the Quraysh tribe', 'To perform Umrah'],
        answer: 'To defend Madinah from the enemy'
    },
    {
        question: 'How many times did Hazrat Muhammad (PBUH) perform Umrah during his lifetime?',
        options: ['3 times', '4 times', '6 times', '7 times'],
        answer: '4 times'
    },
    {
        question: 'What is the name of the prayer performed at dawn?',
        options: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib'],
        answer: 'Fajr'
    },
    {
        question: 'What should we do when making Dua?',
        options: ['Raise our voices', 'Be impatient', 'Be sincere and humbled', 'Make Dua only for ourselves'],
        answer: 'Be sincere and humbled'
    },
    {
        question: 'Which verse of the Quran was revealed during the Battle of the Trench?',
        options: ['Surah Al Ahzab Verse 9', 'Surah Al Ahzab Verse 10', 'Surah Al Ahzab Verse 11', 'Surah Al Ahzab Verse 12'],
        answer: 'Surah Al Ahzab Verse 9'
    },
    {
        question: 'What was the name of Hazrat Muhammad\'s (PBUH) camel?',
        options: ['Qaswa', 'Safi', 'Halima', 'Aiwa'],
        answer: 'Qaswa'
    },
    {
        question: 'Which of the following rivers is the longest in the world?',
        options: ['Amazon River', 'Yangtze River', 'Nile River', 'Mississippi River'],
        answer: 'Nile River'
    },
    {
        question: 'Which of the following is an example of a plain?',
        options: ['The Indo-Gangetic Plain', 'The Himalayan Mountains', 'The Sahara Desert', 'The Amazon Rainforest'],
        answer: 'The Indo-Gangetic Plain'
    },
    {
        question: 'What is the process called when water moves from the ground to the atmosphere?',
        options: ['Condensation', 'Transpiration', 'Evaporation', 'Infiltration'],
        answer: 'Evaporation'
    },
    {
        question: 'What is a settlement?',
        options: ['A temporary place of residence', 'A rural area', 'A permanent place of residence', 'A natural feature'],
        answer: 'A permanent place of residence'
    },
    {
        question: 'What is the main source of water for rivers?',
        options: ['Rainfall', 'Snowmelt', 'Underground springs', 'All of the above'],
        answer: 'All of the above'
    },
    {
        question: 'What is the main source of water on Earth?',
        options: ['Rivers', 'Oceans', 'Lakes', 'Groundwater'],
        answer: 'Oceans'
    },
    {
        question: 'Which of the following is an example of a renewable water source?',
        options: ['Fossil water', 'River water', 'Groundwater', 'Desalinated water'],
        answer: 'River water'
    },
    {
        question: 'Which of the following is an example of a rural settlement?',
        options: ['Village', 'City', 'Town', 'Metropolis'],
        answer: 'Village'
    },
    {
        question: 'What is a plain?',
        options: ['A high area of land', 'A narrow valley', 'A wide river', 'A low area of land'],
        answer: 'A low area of land'
    },
    {
        question: 'Why is it important to plan and manage land use?',
        options: ['To protect the environment', 'To promote economic growth', 'To ensure public safety', 'All of the above'],
        answer: 'All of the above'
    },
    {
        question: 'What is the main purpose of irrigation in agriculture?',
        options: ['To control pests and diseases', 'To provide nutrients to crops', 'To supply water to crops', 'To harvest crops'],
        answer: 'To supply water to crops'
    },
    {
        question: 'What are minerals?',
        options: ['Naturally occurring inorganic substances', 'Man-made substances', 'Organic substances', 'Living organisms'],
        answer: 'Naturally occurring inorganic substances'
    },
    {
        question: 'Who was Hazrat Muhammad\'s (PBUH) first wife?',
        options: ['Aisha (RA)', 'Fatima (RA)', 'Khadija (RA)', 'Zainab (RA)'],
        answer: 'Khadija (RA)'
    },
    {
        question: 'What is the Khyber Pass?',
        options: ['A mountain peak', 'A river valley', 'A trade route', 'A mountain pass'],
        answer: 'A mountain pass'
    },
    {
        question: 'Which countries are linked by the Khyber Pass?',
        options: ['India and Pakistan', 'India and Afghanistan', 'Afghanistan and Pakistan', 'Afghanistan and Tajikistan'],
        answer: 'Afghanistan and Pakistan'
    },
    {
        question: 'Which of the following is an example of a subsistence crop?',
        options: ['Wheat', 'Rice', 'Corn', 'Cotton'],
        answer: 'Rice'
    },
    {
        question: 'Which of the following is a major cause of climate change?',
        options: ['Burning of fossil fuels', 'Deforestation', 'Industrial agriculture', 'All of the above'],
        answer: 'All of the above'
    },
    {
        question: 'Which of the following is a renewable energy source?',
        options: ['Coal', 'Natural Gas', 'Solar energy', 'Oil'],
        answer: 'Solar energy'
    },
    {
        question: '"Quaid-e-Azam" is an example of a/an ___?',
        options: ['Common noun', 'Proper noun', 'Countable noun', 'Uncountable noun'],
        answer: 'Proper noun'
    },
    {
        question: 'What is the length of the Khyber Pass?',
        options: ['50 km', '100 km', '53 km', '150 km'],
        answer: '53 km'
    },
    {
        question: 'What is the importance of personal hygiene?',
        options: ['To prevent the spread of diseases', 'To look good', 'To feel good', 'To impress others'],
        answer: 'To prevent the spread of diseases'
    },
    {
        question: 'The process that consumes carbon dioxide and produces oxygen is:',
        options: ['Respiration', 'Combustion', 'Photosynthesis', 'Fossilization'],
        answer: 'Photosynthesis'
    },
    {
        question: 'The most common non-biodegradable pollutant is:',
        options: ['Wood', 'Leaf litter', 'Bodies of dead animals', 'Plastic bags'],
        answer: 'Plastic bags'
    },
    {
        question: 'Which of the following is not part of the forebrain?',
        options: ['Cerebellum', 'Cerebrum', 'Thalamus', 'Hypothalamus'],
        answer: 'Cerebellum'
    },
    {
        question: 'The organism that kills another for food is called a ___?',
        options: ['Prey', 'Predator', 'Parasite', 'Pathogen'],
        answer: 'Predator'
    },
    {
        question: 'The basic unit of structure and function of the nervous system is ___?',
        options: ['Nerve', 'Neuron', 'Brain', 'Spinal cord'],
        answer: 'Neuron'
    },
    {
        question: 'Everything you do is controlled by the ___?',
        options: ['Respiratory system', 'Circulatory system', 'Digestive system', 'Nervous system'],
        answer: 'Nervous system'
    },
    {
        question: 'Which is the largest part of the brain?',
        options: ['Brain stem', 'Cerebrum', 'Hypothalamus', 'Thalamus'],
        answer: 'Cerebrum'
    },
    {
        question: 'The baking process uses enzymes from ___?',
        options: ['Wheat', 'Rice', 'Corn', 'Yeast'],
        answer: 'Yeast'
    },
    {
        question: 'When an ant or a bee stings you, it injects ___?',
        options: ['An alkali', 'An acid', 'A salt', 'Water'],
        answer: 'An acid'
    },
    {
        question: 'The device that is used to protect a circuit against overload is a ___?',
        options: ['Heater', 'Fuse', 'Lamp', 'Switch'],
        answer: 'Fuse'
    },
    {
        question: 'The absolute value of -3 is ___?',
        options: ['-3', '0', '3', '6'],
        answer: '3'
    },
    {
        question: 'An amount that is added to the cost price to calculate the sale price is called ___?',
        options: ['Loss', 'Profit', 'Markup', 'Principal'],
        answer: 'Markup'
    },
    {
        question: 'The cube of a number is that number raised to the power ___?',
        options: ['1', '3', '2', '9'],
        answer: '3'
    },
    {
        question: 'If a set has three elements, then the number of subsets of that set is ___?',
        options: ['3', '5', '6', '8'],
        answer: '8'
    },
    {
        question: '___ are the algebraic expressions in which the powers of variables are whole numbers.',
        options: ['Expressions', 'Arithmetic sequences', 'Open sentences', 'Polynomials'],
        answer: 'Polynomials'
    },
    {
        question: 'The cube root of 729 is ___?',
        options: ['6', '7', '8', '9'],
        answer: '9'
    },
    {
        question: 'The 11th term of the sequence 3, 11, 19, ___ is ___?',
        options: ['83', '80', '79', '75'],
        answer: '83'
    },
    {
        question: 'The measure of steepness is known as ___?',
        options: ['Angle', 'Gradient', 'Run', 'Rise'],
        answer: 'Gradient'
    },
    {
        question: 'Force applied per unit area gives ___?',
        options: ['Buoyancy', 'Pressure', 'Friction', 'Net force'],
        answer: 'Pressure'
    },
    {
        question: 'What type of mirror is used in a solar cooker?',
        options: ['Concave', 'Plane', 'Convex', 'Flat'],
        answer: 'Concave'
    },
    {
        question: 'Decimal numbers that have an infinite number of digits after the decimal point are called ___?',
        options: ['Terminating', 'Like', 'Unlike', 'Non-terminating'],
        answer: 'Non-terminating'
    },
    {
        question: 'Finding the square root is the inverse process of ___?',
        options: ['Squaring the number', 'Adding a number', 'Perfect cube of a number', 'Division of a number'],
        answer: 'Squaring the number'
    },
    {
        question: 'The most effective method to prevent a disease is ___?',
        options: ['Surgery', 'Organ transplant', 'Vaccination', 'Radiotherapy'],
        answer: 'Vaccination'
    },
    {
        question: 'How many elements are present in the first period of the periodic table?',
        options: ['2', '4', '6', '8'],
        answer: '2'
    },
    {
        question: 'If the horizontal change is 3 and the gradient is 2 then the vertical change is ___?',
        options: ['3', '2', '5', '6'],
        answer: '6'
    },
    {
        question: 'When the central angle formed by two radii is 90 degrees, the sector is called a ___?',
        options: ['180°', '270°', 'Quadrant', '360°'],
        answer: 'Quadrant'
    },
    {
        question: 'Two or more circles with the same center but different radii are called ___ circles.',
        options: ['Tangent', 'Secant', 'Radii', 'Concentric'],
        answer: 'Concentric'
    },
    {
        question: 'Discrete data is in the form of ___?',
        options: ['Fraction', 'Decimal number', 'Rational number', 'Whole numbers'],
        answer: 'Whole numbers'
    },
    {
        question: 'The equation of a horizontal line is ___?',
        options: ['y = c', 'x = c', 'y = mx', 'y = mx + c'],
        answer: 'y = c'
    },
    {
        question: 'A line that meets or touches a circle at only one point is called ___?',
        options: ['Secant', 'Tangent', 'Sector', 'Arc'],
        answer: 'Tangent'
    },
    {
        question: 'A trapezium has ___ pair of parallel sides.',
        options: ['1', '2', '0', '3'],
        answer: '1'
    },
    {
        question: 'The ___ of each bar in a histogram represents the size of the class.',
        options: ['Length', 'Area', 'Width', 'Height'],
        answer: 'Length'
    },
    {
        question: 'The difference between the highest and the lowest value of the data is called ___?',
        options: ['Variance', 'Range', 'Class boundary', 'Standard deviation'],
        answer: 'Range'
    },
    {
        question: 'Which of the following is involved in the transport of food in plants?',
        options: ['Phloem', 'Xylem', 'Epidermis', 'Mesophyll'],
        answer: 'Phloem'
    },
    {
        question: 'The exchange of substances between blood and body cells takes place at the ___?',
        options: ['Capillaries', 'Veins', 'Arteries', 'Heart'],
        answer: 'Capillaries'
    },
    {
        question: 'Which of these can provide you with long-term immunity against infectious diseases?',
        options: ['Antibiotics', 'Vitamins', 'Red blood cells', 'Vaccines'],
        answer: 'Vaccines'
    },
    {
        question: 'The root system that can get water from deep underground sources is ___?',
        options: ['Fibrous roots', 'Taproots', 'Storage roots', 'Root nodules'],
        answer: 'Taproots'
    },
    {
        question: 'Vascular bundles are present in every part of the plant. They are made up of ___?',
        options: ['Xylem only', 'Phloem only', 'Xylem and phloem', 'Xylem phloem and root hair cells'],
        answer: 'Xylem and phloem'
    },
    {
        question: 'A person affected with anemia looks pale and feels tired. All his body cells are getting ___?',
        options: ['Less food', 'Less water', 'Less oxygen', 'Less carbon dioxide'],
        answer: 'Less oxygen'
    },
    {
        question: 'Which of the following is an example of a physical change?',
        options: ['Mixing baking soda and vinegar causes bubbles', 'Chopping of log', 'Burning a paper with a lighter', 'Baking a birthday cake for your mother'],
        answer: 'Chopping of log'
    },
    {
        question: 'Which of the following is an example of a chemical change?',
        options: ['Filling up a balloon with air', 'Freezing of water', 'Photosynthesis', 'Boiling of water'],
        answer: 'Photosynthesis'
    },
    {
        question: 'What best describes a physical change?',
        options: ['Composition changes', 'State stays the same', 'Composition stays the same', 'Mass is lost'],
        answer: 'Composition stays the same'
    },
    {
        question: 'Which change can be easily reversed?',
        options: ['Physical change', 'Chemical change', 'Both physical and chemical changes', 'Neither physical nor chemical change'],
        answer: 'Physical change'
    },
    {
        question: 'Hertz (Hz) is the unit of ___?',
        options: ['Mass', 'Energy', 'Loudness', 'Frequency'],
        answer: 'Frequency'
    },
    {
        question: 'Sound waves cannot pass through ___?',
        options: ['Solids', 'Liquids', 'Gases', 'Vacuum'],
        answer: 'Vacuum'
    },
    {
        question: 'J is the symbol for the unit joule. It is the unit of ___?',
        options: ['Temperature', 'Voltage', 'Power', 'Heat'],
        answer: 'Heat'
    },
    {
        question: 'Which is the melting point of ice?',
        options: ['0 K', '32°C', '273 K', '100°C'],
        answer: '273 K'
    },
    {
        question: 'Conduction of heat best takes place in ___?',
        options: ['Solids', 'Fluids', 'Gases', 'Vacuum'],
        answer: 'Solids'
    },
    {
        question: 'Which one is not a way to preserve food?',
        options: ['Freezing', 'Pickling', 'Curing', 'Garnishing'],
        answer: 'Garnishing'
    },
    {
        question: 'Which of the following is a non-contact force?',
        options: ['Gravity', 'Friction', 'Spring force', 'Tension in string'],
        answer: 'Gravity'
    },
    {
        question: 'To hear an echo, the minimum distance between the sound source and the obstacle should be ___?',
        options: ['17 cm', '17 m', '71 m', '0.17 m'],
        answer: '17 m'
    },
    {
        question: 'Which of the following animals has the lowest pitch of sound?',
        options: ['Sparrow', 'Dog', 'Cat', 'Mosquito'],
        answer: 'Mosquito'
    },
    {
        question: 'Which of the following is the best conductor?',
        options: ['Wood', 'Water', 'Metal', 'Plastic'],
        answer: 'Metal'
    },
    {
        question: 'Which ___ is a bad conductor of heat?',
        options: ['Metal', 'Wood', 'Wool', 'Air'],
        answer: 'Wool'
    },
    {
        question: 'The percentage of fresh water on Earth is not more than ___?',
        options: ['0.025', '0.03', '0.02', '0.25'],
        answer: '0.25'
    },
    {
        question: 'Use of hand sanitizer helps in ___?',
        options: ['Killing germs from the skin and keeping it safe', 'Growing germs', 'Keeping skin safe', 'Keeping skin moisturized'],
        answer: 'Killing germs from the skin and keeping it safe'
    },
    {
        question: 'In pickling, food is soaked in ___?',
        options: ['Water', 'Oil', 'Solution of salt and acid', 'Solution of sugar and acid'],
        answer: 'Solution of salt and acid'
    },
{
        question: 'If it is spring in the Southern Hemisphere of Earth, then which weather is in the Northern Hemisphere?',
        options: ['Summer', 'Spring', 'Autumn', 'Winter'],
        answer: 'Autumn'
    },
    {
        question: 'The neutral integer is ___?',
        options: ['-1', '1', '0', '2'],
        answer: '0'
    },
    {
        question: 'When we find the square of an even number, the result is a/an ___?',
        options: ['Odd', 'Even', 'Prime', 'Composite'],
        answer: 'Even'
    },
    {
        question: 'Where is Minar-e-Pakistan located?',
        options: ['Lahore', 'Karachi', 'Islamabad', 'Sawat'],
        answer: 'Lahore'
    },
    {
        question: 'What is the chemical formula of water?',
        options: ['H2O', 'HO2', 'H3O', 'H2O2'],
        answer: 'H2O'
    },
    {
        question: 'What is the volume of a cube whose edge is 2 cm long?',
        options: ['4 cm³', '8 cm³', '16 cm³', '32 cm³'],
        answer: '8 cm³'
    },
    {
        question: 'Which instrument is used to measure wind speed?',
        options: ['Hydrometer', 'Ammeter', 'Anemometer', 'Hygrometer'],
        answer: 'Anemometer'
    },
    {
        question: 'Who was the first person to step on the moon?',
        options: ['Neil Armstrong', 'Michael Collins', 'Buzz Aldrin', 'John Young'],
        answer: 'Neil Armstrong'
    },
    {
        question: 'SI unit of weight is ___?',
        options: ['Newton', 'Kilogram', 'Meter per second', 'Pascal'],
        answer: 'Newton'
    },
    {
        question: 'A rational number is a number that can be represented in the form of ___?',
        options: ['Geometry', 'Fraction', 'Circle', 'CM'],
        answer: 'Fraction'
    },
    {
        question: 'Rational numbers with the same denominator are called ___ rational numbers.',
        options: ['Equivalent', 'Proper', 'Unlike', 'Like'],
        answer: 'Like'
    },
    {
        question: 'When a number is ___ by itself, the value we get is called the square of the number.',
        options: ['Added', 'Multiplied', 'Subtracted', 'Divided'],
        answer: 'Multiplied'
    },
    {
        question: 'MS Excel is an example of ___?',
        options: ['Operating system', 'Application software', 'Input device', 'Processor'],
        answer: 'Application software'
    },
    {
        question: 'Which is the largest plateau in the world?',
        options: ['Iranian plateau', 'Deccan plateau', 'Loess plateau', 'Tibetan plateau'],
        answer: 'Tibetan plateau'
    },
    {
        question: 'What is the fourth state of matter?',
        options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
        answer: 'Plasma'
    },
    {
        question: 'What is the full form of Wi-Fi?',
        options: ['Wireless fiber', 'Wireless fidelity', 'Wireless fiction', 'Wired fidelity'],
        answer: 'Wireless fidelity'
    },
    {
        question: 'How many degrees are in a circle?',
        options: ['180', '240', '300', '360'],
        answer: '360'
    },
    {
        question: 'Victoria Hospital is in ___?',
        options: ['Faisalabad', 'Rahimyar Khan', 'Multan', 'Bahawalpur'],
        answer: 'Bahawalpur'
    },
    {
        question: 'Which is the highest peak of the Himalayas range in Pakistan?',
        options: ['K-2', 'Nanga Parbat', 'Pamir', 'Rakaposhi'],
        answer: 'Nanga Parbat'
    },
    {
        question: 'Height of Nanga Parbat is ___ meters above sea level.',
        options: ['8026', '8126', '8226', '8326'],
        answer: '8126'
    },
    {
        question: 'What is the percentage of saltwater on Earth?',
        options: ['95%', '96%', '97%', '99%'],
        answer: '97%'
    },
    {
        question: 'ATM is an abbreviation of ___?',
        options: ['Automated Teller Machine', 'Automatic Tall Machine', 'Automobile Tax Machine', 'All Time Money'],
        answer: 'Automated Teller Machine'
    },
    {
        question: 'Which river is known as the "Father of Rivers"?',
        options: ['Kabul', 'Jehlum', 'Chenab', 'Indus'],
        answer: 'Indus'
    },
    {
        question: 'Which country has no railway track?',
        options: ['China', 'Japan', 'Africa', 'Afghanistan'],
        answer: 'Afghanistan'
    },
    {
        question: 'Urdu was declared as the official language in ___?',
        options: ['1930', '1830', '1832', '1932'],
        answer: '1932'
    },
    {
        question: '___ is called the Killer Mountain.',
        options: ['K-2', 'Nanga Parbat', 'Pamir', 'Rakaposhi'],
        answer: 'Nanga Parbat'
    },
    {
        question: 'How many stanzas are there in the National Anthem?',
        options: ['1', '2', '3', '4'],
        answer: '3'
    },
    {
        question: 'Which is the biggest bird in the world?',
        options: ['Kiwi', 'Eagle', 'Bat', 'Ostrich'],
        answer: 'Ostrich'
    },
    {
        question: 'How many basic alphabets are in the Urdu language?',
        options: ['26', '30', '39', '40'],
        answer: '39'
    },
    {
        question: 'Sunlight is made of ___ colours.',
        options: ['5', '6', '7', '8'],
        answer: '7'
    },
    {
        question: 'When did Quaid-e-Azam join the Muslim League?',
        options: ['1910', '1913', '1930', '1947'],
        answer: '1913'
    }
];


startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    clearInterval(questionTimerInterval);
    questionTimes.push(Date.now() - questionStartTimes[currentQuestionIndex]);

    // Automatically mark as skipped if not answered
    if (!answeredQuestions.includes(currentQuestionIndex) && !skippedQuestionsList.includes(currentQuestionIndex)) {
        skippedQuestions++;
        skippedQuestionsList.push(currentQuestionIndex);
    }

    currentQuestionIndex++;
    setNextQuestion();
});

backBtn.addEventListener('click', () => {
    clearInterval(questionTimerInterval);
    currentQuestionIndex--;
    setNextQuestion();
});

function startQuiz() {
    startScreen.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    startTime = Date.now();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        showResults();
    }
    backBtn.classList.toggle('hide', currentQuestionIndex === 0);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', selectAnswer);
        optionsElement.appendChild(button);
    });

    const dontKnowButton = document.createElement('button');
    dontKnowButton.innerText = "I don't know";
    dontKnowButton.classList.add('dont-know');
    dontKnowButton.addEventListener('click', skipQuestion);
    optionsElement.appendChild(dontKnowButton);

    questionStartTimes[currentQuestionIndex] = Date.now();
    startTimer();
}

function resetState() {
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

function selectAnswer(e) {
    clearInterval(questionTimerInterval);
    const selectedButton = e.target;
    const correct = selectedButton.innerText === shuffledQuestions[currentQuestionIndex].answer;

    if (!answeredQuestions.includes(currentQuestionIndex)) {
        if (correct) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
        answeredQuestions.push(currentQuestionIndex);
    }

    Array.from(optionsElement.children).forEach(button => {
        if (button.innerText === shuffledQuestions[currentQuestionIndex].answer) {
            button.style.backgroundColor = 'lightgreen';
        } else {
            button.disabled = true;
        }
    });

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextBtn.classList.remove('hide');
    } else {
        showResults();
    }
}

function skipQuestion() {
    clearInterval(questionTimerInterval);

    if (!skippedQuestionsList.includes(currentQuestionIndex)) {
        skippedQuestions++;
        skippedQuestionsList.push(currentQuestionIndex);
    }

    questionTimes.push(Date.now() - questionStartTimes[currentQuestionIndex]);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        showResults();
    }
}

function startTimer() {
    let seconds = 0;
    questionTimerInterval = setInterval(() => {
        seconds++;
        timerElement.innerText = `Time: ${seconds}s`;
    }, 1000);
}

function showResults() {
    questionContainer.classList.add('hide');
    resultsContainer.classList.remove('hide');
    const totalTime = (Date.now() - startTime) / 1000;
    const avgTime = totalTime / shuffledQuestions.length;
    let questionTimesDisplay = '';
    questionTimes.forEach((time, index) => {
        questionTimesDisplay += `<p>Question ${index + 1}: ${time / 1000}s</p>`;
    });

    resultsElement.innerText = `${correctAnswers}/${shuffledQuestions.length} = correct, ${incorrectAnswers}/${shuffledQuestions.length} = incorrect, ${skippedQuestions}/${shuffledQuestions.length} = skipped`;
    totalTimeElement.innerText = `Total time: ${totalTime}s`;
    avgTimeElement.innerText = `Average time per question: ${avgTime}s`;
    questionTimesElement.innerHTML = questionTimesDisplay;
}