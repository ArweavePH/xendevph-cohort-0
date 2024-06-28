local json = require('json')

math.randomseed(os.time())

local general_questions = {{
    question = "What is the capital of France?",
    answers = {"Paris", "Berlin", "Madrid", "Rome"},
    correct = "Paris"
}, {
    question = "What is 2 + 2?",
    answers = {"3", "4", "5", "6"},
    correct = "4"
}, {
    question = "Which planet is known as the Red Planet?",
    answers = {"Earth", "Mars", "Jupiter", "Venus"},
    correct = "Mars"
}, {
    question = "What is the largest mammal?",
    answers = {"Elephant", "Blue Whale", "Giraffe", "Hippopotamus"},
    correct = "Blue Whale"
}, {
    question = "Who wrote 'Romeo and Juliet'?",
    answers = {"Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"},
    correct = "William Shakespeare"
}, {
    question = "What is the speed of light?",
    answers = {"300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"},
    correct = "300,000 km/s"
}, {
    question = "Who is known as the father of computers?",
    answers = {"Alan Turing", "Charles Babbage", "Steve Jobs", "Bill Gates"},
    correct = "Charles Babbage"
}, {
    question = "What is the hardest natural substance on Earth?",
    answers = {"Gold", "Iron", "Diamond", "Platinum"},
    correct = "Diamond"
}, {
    question = "What is the capital of Japan?",
    answers = {"Beijing", "Seoul", "Bangkok", "Tokyo"},
    correct = "Tokyo"
}, {
    question = "What is the chemical symbol for water?",
    answers = {"O2", "H2O", "CO2", "NaCl"},
    correct = "H2O"
}, {
    question = "How many continents are there?",
    answers = {"5", "6", "7", "8"},
    correct = "7"
}, {
    question = "Who painted the Mona Lisa?",
    answers = {"Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"},
    correct = "Leonardo da Vinci"
}, {
    question = "What is the largest planet in our solar system?",
    answers = {"Earth", "Mars", "Jupiter", "Saturn"},
    correct = "Jupiter"
}, {
    question = "What is the smallest prime number?",
    answers = {"0", "1", "2", "3"},
    correct = "2"
}, {
    question = "What is the tallest mountain in the world?",
    answers = {"K2", "Kangchenjunga", "Mount Everest", "Lhotse"},
    correct = "Mount Everest"
}, {
    question = "Who was the first president of the United States?",
    answers = {"Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"},
    correct = "George Washington"
}, {
    question = "What is the capital of Italy?",
    answers = {"Rome", "Milan", "Naples", "Florence"},
    correct = "Rome"
}, {
    question = "What is the formula for calculating the area of a circle?",
    answers = {"2πr", "πr²", "πd", "2πr²"},
    correct = "πr²"
}, {
    question = "What is the most abundant gas in the Earth's atmosphere?",
    answers = {"Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"},
    correct = "Nitrogen"
}, {
    question = "What is the chemical symbol for gold?",
    answers = {"Au", "Ag", "Gd", "Pb"},
    correct = "Au"
}, {
    question = "Who wrote 'The Odyssey'?",
    answers = {"Homer", "Socrates", "Plato", "Aristotle"},
    correct = "Homer"
}, {
    question = "What is the main ingredient in traditional Japanese miso soup?",
    answers = {"Rice", "Soybean paste", "Fish", "Seaweed"},
    correct = "Soybean paste"
}, {
    question = "Who was the first man to step on the moon?",
    answers = {"Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"},
    correct = "Neil Armstrong"
}, {
    question = "What is the freezing point of water?",
    answers = {"0°C", "32°C", "100°C", "212°C"},
    correct = "0°C"
}, {
    question = "What is the chemical formula for salt?",
    answers = {"H2O", "CO2", "NaCl", "C6H12O6"},
    correct = "NaCl"
}, {
    question = "Which is the smallest ocean in the world?",
    answers = {"Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"},
    correct = "Arctic Ocean"
}, {
    question = "What is the capital of Canada?",
    answers = {"Toronto", "Vancouver", "Ottawa", "Montreal"},
    correct = "Ottawa"
}, {
    question = "Who developed the theory of relativity?",
    answers = {"Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"},
    correct = "Albert Einstein"
}, {
    question = "What is the largest bone in the human body?",
    answers = {"Femur", "Tibia", "Fibula", "Humerus"},
    correct = "Femur"
}, {
    question = "What is the hardest rock?",
    answers = {"Granite", "Marble", "Limestone", "Diamond"},
    correct = "Diamond"
}, {
    question = "Which planet is closest to the sun?",
    answers = {"Earth", "Mars", "Venus", "Mercury"},
    correct = "Mercury"
}, {
    question = "What is the primary source of energy for the Earth?",
    answers = {"Wind", "Sun", "Water", "Geothermal"},
    correct = "Sun"
}, {
    question = "What is the chemical symbol for silver?",
    answers = {"Si", "Ag", "Au", "Pb"},
    correct = "Ag"
}, {
    question = "Who was the first woman to fly solo across the Atlantic?",
    answers = {"Bessie Coleman", "Amelia Earhart", "Harriet Quimby", "Jacqueline Cochran"},
    correct = "Amelia Earhart"
}, {
    question = "What is the boiling point of water?",
    answers = {"100°C", "90°C", "110°C", "120°C"},
    correct = "100°C"
}, {
    question = "What is the capital of Australia?",
    answers = {"Sydney", "Melbourne", "Brisbane", "Canberra"},
    correct = "Canberra"
}, {
    question = "What is the most spoken language in the world?",
    answers = {"English", "Spanish", "Mandarin", "Hindi"},
    correct = "Mandarin"
}, {
    question = "What is the chemical symbol for iron?",
    answers = {"Fe", "Ir", "In", "Io"},
    correct = "Fe"
}, {
    question = "Who wrote 'To Kill a Mockingbird'?",
    answers = {"Harper Lee", "Mark Twain", "F. Scott Fitzgerald", "J.D. Salinger"},
    correct = "Harper Lee"
}, {
    question = "What is the largest country by area?",
    answers = {"Canada", "China", "United States", "Russia"},
    correct = "Russia"
}, {
    question = "What is the smallest unit of life?",
    answers = {"Organ", "Tissue", "Cell", "Atom"},
    correct = "Cell"
}, {
    question = "What is the capital of Germany?",
    answers = {"Berlin", "Munich", "Hamburg", "Frankfurt"},
    correct = "Berlin"
}, {
    question = "Who invented the telephone?",
    answers = {"Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"},
    correct = "Alexander Graham Bell"
}, {
    question = "What is the speed of sound?",
    answers = {"343 m/s", "299,792 km/s", "1235 km/h", "1,480 m/s"},
    correct = "343 m/s"
}, {
    question = "What is the largest organ in the human body?",
    answers = {"Heart", "Liver", "Skin", "Lungs"},
    correct = "Skin"
}, {
    question = "What is the capital of Russia?",
    answers = {"Saint Petersburg", "Novosibirsk", "Moscow", "Kazan"},
    correct = "Moscow"
}, {
    question = "Who wrote 'Pride and Prejudice'?",
    answers = {"Charlotte Bronte", "Jane Austen", "George Eliot", "Mary Shelley"},
    correct = "Jane Austen"
}, {
    question = "What is the main gas found in the air we breathe?",
    answers = {"Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"},
    correct = "Nitrogen"
}, {
    question = "Which planet is known as the Earth's twin?",
    answers = {"Mars", "Venus", "Jupiter", "Saturn"},
    correct = "Venus"
}, {
    question = "What is the capital of India?",
    answers = {"Mumbai", "New Delhi", "Kolkata", "Chennai"},
    correct = "New Delhi"
}, {
    question = "Who developed the laws of motion?",
    answers = {"Albert Einstein", "Isaac Newton", "Galileo Galilei", "Johannes Kepler"},
    correct = "Isaac Newton"
}, {
    question = "What is the largest island in the world?",
    answers = {"Borneo", "New Guinea", "Greenland", "Madagascar"},
    correct = "Greenland"
}, {
    question = "What is the chemical symbol for sodium?",
    answers = {"Na", "So", "Sa", "Sn"},
    correct = "Na"
}, {
    question = "Who wrote 'The Catcher in the Rye'?",
    answers = {"Harper Lee", "J.D. Salinger", "F. Scott Fitzgerald", "Ernest Hemingway"},
    correct = "J.D. Salinger"
}, {
    question = "What is the capital of Egypt?",
    answers = {"Cairo", "Alexandria", "Giza", "Luxor"},
    correct = "Cairo"
}, {
    question = "What is the chemical symbol for carbon dioxide?",
    answers = {"C2", "CO", "C2O", "CO2"},
    correct = "CO2"
}, {
    question = "Which is the largest desert in the world?",
    answers = {"Arabian Desert", "Gobi Desert", "Sahara Desert", "Antarctic Desert"},
    correct = "Antarctic Desert"
}, {
    question = "What is the capital of Spain?",
    answers = {"Barcelona", "Madrid", "Valencia", "Seville"},
    correct = "Madrid"
}, {
    question = "Who painted the Sistine Chapel ceiling?",
    answers = {"Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"},
    correct = "Michelangelo"
}, {
    question = "What is the smallest country in the world?",
    answers = {"Monaco", "San Marino", "Liechtenstein", "Vatican City"},
    correct = "Vatican City"
}, {
    question = "Who wrote '1984'?",
    answers = {"George Orwell", "Aldous Huxley", "Ray Bradbury", "Arthur C. Clarke"},
    correct = "George Orwell"
}, {
    question = "What is the capital of the United Kingdom?",
    answers = {"London", "Edinburgh", "Manchester", "Birmingham"},
    correct = "London"
}, {
    question = "What is the chemical symbol for potassium?",
    answers = {"K", "Po", "Pt", "P"},
    correct = "K"
}, {
    question = "Who is known as the father of modern physics?",
    answers = {"Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"},
    correct = "Albert Einstein"
}, {
    question = "What is the capital of Brazil?",
    answers = {"Rio de Janeiro", "São Paulo", "Brasília", "Salvador"},
    correct = "Brasília"
}, {
    question = "What is the largest ocean?",
    answers = {"Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"},
    correct = "Pacific Ocean"
}, {
    question = "What is the chemical symbol for hydrogen?",
    answers = {"H", "Hy", "Hd", "Hg"},
    correct = "H"
}, {
    question = "Who wrote 'The Great Gatsby'?",
    answers = {"Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"},
    correct = "F. Scott Fitzgerald"
}, {
    question = "What is the capital of Mexico?",
    answers = {"Monterrey", "Guadalajara", "Cancun", "Mexico City"},
    correct = "Mexico City"
}, {
    question = "What is the chemical symbol for calcium?",
    answers = {"Ca", "Cl", "C", "Cm"},
    correct = "Ca"
}, {
    question = "Who wrote 'Moby-Dick'?",
    answers = {"Mark Twain", "Herman Melville", "Nathaniel Hawthorne", "Edgar Allan Poe"},
    correct = "Herman Melville"
}, {
    question = "What is the capital of China?",
    answers = {"Shanghai", "Beijing", "Hong Kong", "Guangzhou"},
    correct = "Beijing"
}, {
    question = "Who is known as the father of the computer?",
    answers = {"Alan Turing", "John von Neumann", "Charles Babbage", "George Boole"},
    correct = "Charles Babbage"
}, {
    question = "What is the chemical symbol for helium?",
    answers = {"He", "H", "Hl", "Hm"},
    correct = "He"
}, {
    question = "Who wrote 'War and Peace'?",
    answers = {"Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Vladimir Nabokov"},
    correct = "Leo Tolstoy"
}, {
    question = "What is the capital of Argentina?",
    answers = {"Córdoba", "Rosario", "Buenos Aires", "Mendoza"},
    correct = "Buenos Aires"
}, {
    question = "What is the largest lake in the world?",
    answers = {"Lake Superior", "Lake Victoria", "Caspian Sea", "Lake Baikal"},
    correct = "Caspian Sea"
}, {
    question = "What is the chemical symbol for aluminum?",
    answers = {"Al", "Au", "Am", "Ag"},
    correct = "Al"
}, {
    question = "Who wrote 'Crime and Punishment'?",
    answers = {"Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Alexander Pushkin"},
    correct = "Fyodor Dostoevsky"
}, {
    question = "What is the capital of South Korea?",
    answers = {"Seoul", "Busan", "Incheon", "Daegu"},
    correct = "Seoul"
}, {
    question = "What is the chemical symbol for chlorine?",
    answers = {"Cl", "Ch", "Ce", "Co"},
    correct = "Cl"
}, {
    question = "Who wrote 'The Hobbit'?",
    answers = {"J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "George R.R. Martin"},
    correct = "J.R.R. Tolkien"
}, {
    question = "What is the capital of Greece?",
    answers = {"Athens", "Thessaloniki", "Patras", "Heraklion"},
    correct = "Athens"
}, {
    question = "What is the chemical symbol for magnesium?",
    answers = {"Mg", "Mn", "Ma", "M"},
    correct = "Mg"
}, {
    question = "Who wrote 'One Hundred Years of Solitude'?",
    answers = {"Gabriel Garcia Marquez", "Pablo Neruda", "Mario Vargas Llosa", "Isabel Allende"},
    correct = "Gabriel Garcia Marquez"
}, {
    question = "What is the capital of Turkey?",
    answers = {"Istanbul", "Ankara", "Izmir", "Bursa"},
    correct = "Ankara"
}, {
    question = "What is the chemical symbol for copper?",
    answers = {"Cu", "Cp", "Co", "Cr"},
    correct = "Cu"
}, {
    question = "Who wrote 'Don Quixote'?",
    answers = {"Miguel de Cervantes", "Pablo Neruda", "Gabriel Garcia Marquez", "Jorge Luis Borges"},
    correct = "Miguel de Cervantes"
}, {
    question = "What is the capital of Portugal?",
    answers = {"Porto", "Lisbon", "Braga", "Faro"},
    correct = "Lisbon"
}, {
    question = "What is the chemical symbol for zinc?",
    answers = {"Zn", "Zc", "Z", "Zn"},
    correct = "Zn"
}, {
    question = "Who wrote 'The Divine Comedy'?",
    answers = {"Dante Alighieri", "Geoffrey Chaucer", "John Milton", "Homer"},
    correct = "Dante Alighieri"
}, {
    question = "What is the capital of Thailand?",
    answers = {"Bangkok", "Phuket", "Chiang Mai", "Pattaya"},
    correct = "Bangkok"
}, {
    question = "What is the chemical symbol for lead?",
    answers = {"Pb", "Ld", "Le", "Li"},
    correct = "Pb"
}, {
    question = "Who wrote 'The Brothers Karamazov'?",
    answers = {"Leo Tolstoy", "Fyodor Dostoevsky", "Ivan Turgenev", "Alexander Pushkin"},
    correct = "Fyodor Dostoevsky"
}, {
    question = "What is the capital of Sweden?",
    answers = {"Stockholm", "Gothenburg", "Malmö", "Uppsala"},
    correct = "Stockholm"
}, {
    question = "What is the chemical symbol for sulfur?",
    answers = {"S", "Sf", "Su", "Sl"},
    correct = "S"
}, {
    question = "Who wrote 'Anna Karenina'?",
    answers = {"Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"},
    correct = "Leo Tolstoy"
}}

local history_questions = {{
    question = "Who is known as the father of the Philippine Revolution?",
    answers = {"Andres Bonifacio", "Emilio Aguinaldo", "Jose Rizal", "Antonio Luna"},
    correct = "Andres Bonifacio"
}, {
    question = "What is the national hero of the Philippines?",
    answers = {"Emilio Aguinaldo", "Jose Rizal", "Andres Bonifacio", "Manuel L. Quezon"},
    correct = "Jose Rizal"
}, {
    question = "What was the ancient script used by early Filipinos?",
    answers = {"Latin", "Baybayin", "Katakana", "Hangul"},
    correct = "Baybayin"
}, {
    question = "Who is the first President of the Philippines?",
    answers = {"Emilio Aguinaldo", "Manuel L. Quezon", "Jose P. Laurel", "Ferdinand Marcos"},
    correct = "Emilio Aguinaldo"
}, {
    question = "Which event marked the beginning of the Philippine Revolution?",
    answers = {"Cry of Balintawak", "Battle of Mactan", "Declaration of Independence", "People Power Revolution"},
    correct = "Cry of Balintawak"
}, {
    question = "What is the official language of the Philippines?",
    answers = {"Tagalog", "Cebuano", "English", "Filipino"},
    correct = "Filipino"
}, {
    question = "Who is the first female President of the Philippines?",
    answers = {"Cory Aquino", "Gloria Macapagal-Arroyo", "Imelda Marcos", "Sara Duterte"},
    correct = "Cory Aquino"
}, {
    question = "What is the oldest city in the Philippines?",
    answers = {"Manila", "Vigan", "Cebu", "Davao"},
    correct = "Cebu"
}, {
    question = "Who led the longest revolt against Spanish colonization?",
    answers = {"Diego Silang", "Lapu-Lapu", "Francisco Dagohoy", "Gabriela Silang"},
    correct = "Francisco Dagohoy"
}, {
    question = "Which is the largest island in the Philippines?",
    answers = {"Luzon", "Mindanao", "Palawan", "Visayas"},
    correct = "Luzon"
}, {
    question = "Who was the leader of the Filipino forces during the Battle of Mactan?",
    answers = {"Lapu-Lapu", "Rajah Sulayman", "Andres Bonifacio", "Emilio Aguinaldo"},
    correct = "Lapu-Lapu"
}, {
    question = "When did the Philippines gain independence from the United States?",
    answers = {"July 4, 1946", "June 12, 1898", "August 21, 1983", "February 25, 1986"},
    correct = "July 4, 1946"
}, {
    question = "Who is known as the 'Brains of the Katipunan'?",
    answers = {"Jose Rizal", "Emilio Jacinto", "Andres Bonifacio", "Antonio Luna"},
    correct = "Emilio Jacinto"
}, {
    question = "What year did Ferdinand Magellan arrive in the Philippines?",
    answers = {"1521", "1492", "1581", "1621"},
    correct = "1521"
}, {
    question = "What was the ancient name of the Philippines before it was named by the Spaniards?",
    answers = {"Luzviminda", "Tondo", "Las Islas Filipinas", "Maharlika"},
    correct = "Maharlika"
}, {
    question = "Who was the first governor-general of the Philippines during the American period?",
    answers = {"Wesley Merritt", "William Howard Taft", "Frank Murphy", "Francis Burton Harrison"},
    correct = "Wesley Merritt"
}, {
    question = "What is the significance of the Battle of Tirad Pass?",
    answers = {"Victory against Americans", "Defeat of Lapu-Lapu", "Last stand of Filipino forces",
               "Signing of the Treaty of Paris"},
    correct = "Last stand of Filipino forces"
}, {
    question = "Who is the first Filipino saint?",
    answers = {"San Lorenzo Ruiz", "San Pedro Calungsod", "San Pablo", "San Juan"},
    correct = "San Lorenzo Ruiz"
}, {
    question = "When is the Philippine Independence Day celebrated?",
    answers = {"June 12", "July 4", "August 21", "February 25"},
    correct = "June 12"
}, {
    question = "What is the oldest university in Asia located in the Philippines?",
    answers = {"University of the Philippines", "Ateneo de Manila University", "De La Salle University",
               "University of Santo Tomas"},
    correct = "University of Santo Tomas"
}, {
    question = "Who founded the Katipunan?",
    answers = {"Jose Rizal", "Andres Bonifacio", "Emilio Aguinaldo", "Manuel L. Quezon"},
    correct = "Andres Bonifacio"
}, {
    question = "What is the Philippine national flower?",
    answers = {"Sampaguita", "Rafflesia", "Waling-Waling", "Gumamela"},
    correct = "Sampaguita"
}, {
    question = "Who was the Filipino general who became the President of the Republic of Biak-na-Bato?",
    answers = {"Andres Bonifacio", "Emilio Aguinaldo", "Manuel Tinio", "Artemio Ricarte"},
    correct = "Emilio Aguinaldo"
}, {
    question = "Which Filipino hero was executed on December 30, 1896?",
    answers = {"Jose Rizal", "Andres Bonifacio", "Emilio Aguinaldo", "Antonio Luna"},
    correct = "Jose Rizal"
}, {
    question = "What is the longest river in the Philippines?",
    answers = {"Cagayan River", "Pasig River", "Agusan River", "Pampanga River"},
    correct = "Cagayan River"
}, {
    question = "Which event in Philippine history is commemorated every February 25?",
    answers = {"Independence Day", "EDSA People Power Revolution", "National Heroes Day", "Rizal Day"},
    correct = "EDSA People Power Revolution"
}, {
    question = "Who led the expedition that resulted in the discovery of the Philippines in 1521?",
    answers = {"Ferdinand Magellan", "Christopher Columbus", "Vasco da Gama", "Amerigo Vespucci"},
    correct = "Ferdinand Magellan"
}, {
    question = "What was the original name of Luneta Park?",
    answers = {"Bagumbayan", "Tondo", "Intramuros", "Escolta"},
    correct = "Bagumbayan"
}, {
    question = "Which war did the Philippines fight against Spain in 1898?",
    answers = {"Philippine-American War", "Philippine Revolution", "Philippine-Spanish War", "Spanish-American War"},
    correct = "Philippine Revolution"
}, {
    question = "Who was the longest-serving president of the Philippines?",
    answers = {"Ferdinand Marcos", "Manuel Quezon", "Gloria Macapagal-Arroyo", "Jose Laurel"},
    correct = "Ferdinand Marcos"
}, {
    question = "What is the title of Jose Rizal's second novel?",
    answers = {"Noli Me Tangere", "El Filibusterismo", "Mi Ultimo Adios", "Sa Mga Kuko ng Liwanag"},
    correct = "El Filibusterismo"
}, {
    question = "Which Filipino hero was known for his role in the Philippine-American War and his eventual surrender to the Americans?",
    answers = {"Emilio Aguinaldo", "Antonio Luna", "Miguel Malvar", "Gregorio del Pilar"},
    correct = "Emilio Aguinaldo"
}, {
    question = "What is the Philippine national bird?",
    answers = {"Philippine Eagle", "Maya", "Kingfisher", "Tarsier"},
    correct = "Philippine Eagle"
}, {
    question = "Who was the first Filipino cardinal of the Catholic Church?",
    answers = {"Julio Rosales", "Rufino Santos", "Jaime Sin", "Luis Tagle"},
    correct = "Rufino Santos"
}, {
    question = "What was the main reason for the Gomburza execution?",
    answers = {"Religious persecution", "Political dissent", "Military insurrection", "Economic sabotage"},
    correct = "Political dissent"
}, {
    question = "Who was the Filipino general known for the Battle of Tirad Pass?",
    answers = {"Gregorio del Pilar", "Antonio Luna", "Manuel Tinio", "Artemio Ricarte"},
    correct = "Gregorio del Pilar"
}, {
    question = "When did the EDSA People Power Revolution occur?",
    answers = {"1983", "1986", "1987", "1989"},
    correct = "1986"
}, {
    question = "What was the ancient name for the Philippines used by the Chinese?",
    answers = {"Ma-i", "Maharlika", "Luzviminda", "Tondo"},
    correct = "Ma-i"
}, {
    question = "Which treaty ended the Spanish-American War and resulted in the cession of the Philippines to the United States?",
    answers = {"Treaty of Paris", "Treaty of Tordesillas", "Treaty of Versailles", "Treaty of Guadalupe Hidalgo"},
    correct = "Treaty of Paris"
}, {
    question = "What was the first book printed in the Philippines?",
    answers = {"Noli Me Tangere", "Doctrina Christiana", "El Filibusterismo", "Florante at Laura"},
    correct = "Doctrina Christiana"
}, {
    question = "Who was the Filipino revolutionary leader who established the Republic of Zamboanga?",
    answers = {"Pio Valenzuela", "Leon Kilat", "Vicente Alvarez", "Emilio Aguinaldo"},
    correct = "Vicente Alvarez"
}, {
    question = "What is the Philippine national tree?",
    answers = {"Mahogany", "Narra", "Mango", "Acacia"},
    correct = "Narra"
}, {
    question = "Which Filipino scientist is known for his work in the field of chemistry and physics?",
    answers = {"Jose Rizal", "Julian Banzon", "Fe del Mundo", "Angel Alcala"},
    correct = "Julian Banzon"
}, {
    question = "Who is the Filipino general who led the defense of Bataan during World War II?",
    answers = {"Douglas MacArthur", "Vicente Lim", "Jonathan Wainwright", "Carlos P. Romulo"},
    correct = "Vicente Lim"
}, {
    question = "What was the code name for the Japanese occupation of the Philippines during World War II?",
    answers = {"Operation Overlord", "Operation Cartwheel", "Operation Ichi-Go", "Operation Surrender"},
    correct = "Operation Ichi-Go"
}, {
    question = "Who was the founder of the Iglesia ni Cristo?",
    answers = {"Felix Manalo", "Gregorio Aglipay", "Isabelo de los Reyes", "Marcelo H. del Pilar"},
    correct = "Felix Manalo"
}, {
    question = "What is the highest mountain in the Philippines?",
    answers = {"Mount Apo", "Mount Pulag", "Mount Banahaw", "Mount Mayon"},
    correct = "Mount Apo"
}, {
    question = "Who was the first Filipino to win a Nobel Prize?",
    answers = {"Jose Rizal", "Carlos P. Romulo", "Lea Salonga", "Ramon Magsaysay"},
    correct = "Carlos P. Romulo"
}, {
    question = "Who was the Filipino president during the declaration of Martial Law in 1972?",
    answers = {"Ferdinand Marcos", "Corazon Aquino", "Manuel Roxas", "Diosdado Macapagal"},
    correct = "Ferdinand Marcos"
}, {
    question = "What is the Philippine national leaf?",
    answers = {"Anahaw", "Banana", "Coconut", "Pandan"},
    correct = "Anahaw"
}}

CRON_INTERVAL = 5
GAMEROOMS = GAMEROOMS or {}

-- Get random questions
local function getRandomQuestions(questionList, count)
    local selectedQuestions = {}
    local indices = {}

    while #selectedQuestions < count do
        local randomIndex = math.random(#questionList)
        if not indices[randomIndex] then
            table.insert(selectedQuestions, questionList[randomIndex])
            indices[randomIndex] = true
        end
    end

    return selectedQuestions
end

-- Function to generate a random alphanumeric character
local function randomChar()
    local chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    local index = math.random(1, #chars)
    return chars:sub(index, index)
end

-- Function to generate a room code
function generateRoomCode(length)
    length = length or 6 -- Default length is 6 if not specified
    local roomCode = ""
    for i = 1, length do
        roomCode = roomCode .. randomChar()
    end
    return roomCode
end

-- check room state
function generateRoomCode(length)
    length = length or 6 -- Default length is 6 if not specified
    local roomCode = ""
    for i = 1, length do
        roomCode = roomCode .. randomChar()
    end
    return roomCode
end

Handlers.add("CronTick", -- handler name
Handlers.utils.hasMatchingTag("Action", "Cron"), -- handler pattern to identify cron message
function() -- handler task to execute on cron message
    -- do something
    for room_code, room in pairs(GAMEROOMS) do
        if room.state == "WAITING" then
            if #room.players == room.room_max_player then
                room.state = "PLAYING"
            end
            goto continue
        end

        if room.state == "PLAYING" then
            if room.round_state.state == "STARTED" then
                if room.round_state.timer == 0 then
                    room.round_state.timer = 10
                    room.round_state.state = "ENDED"
                end

                room.round_state.timer = room.round_state.timer - CRON_INTERVAL
                goto continue
            else
                if room.round_state.timer == 0 then
                    room.round_state.timer = 20
                    room.round_state.answered = {}
                    room.round = room.round - 1

                    if room.questions[room.round] then
                        room.round_state.question = {
                            question = room.questions[room.round].question,
                            answers = room.questions[room.round].answers
                        }
                    end

                    if room.round <= 0 then
                        room.state = "DONE"
                    else
                        room.round_state.state = "STARTED"
                    end

                end

                room.round_state.timer = room.round_state.timer - CRON_INTERVAL
                goto continue
            end
        end

        if room.state == "DONE" then
            if room.timer == 0 then
                GAMEROOMS[room_code] = nil
            end

            room.timer = room.timer - CRON_INTERVAL
            goto continue
        end

        ::continue::
    end
end)

Handlers.add("create_room", Handlers.utils.hasMatchingTag("Action", "CreateRoom"), function(msg)
    local room_name = generateRoomCode(6)
    local room_max_player = json.decode(msg.Data).room_max_player
    local room_max_round = json.decode(msg.Data).room_max_round
    local user = msg.From

    if not GAMEROOMS[room_name] then
        local questions = getRandomQuestions(general_questions, room_max_round)
        GAMEROOMS[room_name] = {
            players = {user},
            room_max_player = room_max_player,
            room_max_round = room_max_round,
            questions = questions,
            round = room_max_round,
            timer = 60,
            scores = {
                [user] = 0
            },
            state = "WAITING",
            round_state = {
                state = "STARTED", -- STARTED (15), ENDED (5)
                timer = 20,
                answered = {},
                question = questions[room_max_round]
            },
            messages = {}
        }

        Handlers.utils.reply(json.encode({
            status = 1,
            data = room_name,
            message = "Room created successfully!"
        }))(msg)
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room already exists!"
        }))(msg)
    end
end)

Handlers.add("join_room", Handlers.utils.hasMatchingTag("Action", "JoinRoom"), function(msg)
    local room_code = msg.Data
    local user = msg.From

    if GAMEROOMS[room_code] then
        if GAMEROOMS[room_code].state == "PLAYING" then
            Handlers.utils.reply(json.encode({
                status = 0,
                message = "Game already started"
            }))(msg)
            return
        end

        local isPlayer = false

        for _, player in ipairs(GAMEROOMS[room_code].players) do
            if player == user then
                isPlayer = true
                break
            end
        end

        if isPlayer then
            Handlers.utils.reply(json.encode({
                status = 0,
                message = "User is already a player of the room."
            }))(msg)
            return
        else
            table.insert(GAMEROOMS[room_code].players, user)
            GAMEROOMS[room_code].scores[user] = 0

            Handlers.utils.reply(json.encode({
                status = 1,
                data = room_code,
                message = "Joined Room."
            }))(msg)
        end
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room doesnt exists."
        }))(msg)
    end
end)

Handlers.add("game_state", Handlers.utils.hasMatchingTag("Action", "GetGameState"), function(msg)
    local room_code = msg.Data
    local user = msg.From

    if GAMEROOMS[room_code] then
        local game_room = GAMEROOMS[room_code]

        Handlers.utils.reply(json.encode({
            status = 1,
            data = {
                round_state = game_room.round_state,
                room_state = game_room.state,
                players = game_room.players,
                round = game_room.round,
                close_timer = game_room.timer,
                scores = game_room.scores,
                messages = game_room.messages,
                room_max_player = game_room.room_max_player,
                room_max_round = game_room.room_max_round
            }
        }))(msg)
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room doesnt exists."
        }))(msg)
    end
end)

Handlers.add("answer", Handlers.utils.hasMatchingTag("Action", "Answer"), function(msg)
    local room_code = json.decode(msg.Data).room_code
    local answer = json.decode(msg.Data).answer
    local user = msg.From

    if GAMEROOMS[room_code] then
        local game_room = GAMEROOMS[room_code]

        -- Check user if player
        local userExists = false

        for _, player in ipairs(game_room.players) do
            if player == user then
                userExists = true
                break
            end
        end

        if not userExists then
            Handlers.utils.reply(json.encode({
                status = 0,
                message = "User is not registered."
            }))(msg)
            return
        end

        -- Check if playing 
        if game_room.state ~= "PLAYING" then
            Handlers.utils.reply(json.encode({
                status = 0,
                message = "Game state is not playing"
            }))(msg)
            return
        end

        -- Check if started 
        if game_room.round_state.state ~= "STARTED" then
            Handlers.utils.reply(json.encode({
                status = 0,
                message = "Round state is not started"
            }))(msg)
            return
        end

        -- Check if user has already answered
        for _, answered in ipairs(game_room.round_state.answered) do
            if answered.player == user then
                Handlers.utils.reply(json.encode({
                    status = 0,
                    message = "User has already answered."
                }))(msg)
                return
            end
        end

        -- Check Question by round
        local current_question = game_room.questions[game_room.round]

        local is_correct = current_question.correct == answer

        if is_correct then
            game_room.scores[user] = game_room.scores[user] +
                                         (game_room.room_max_player + 1 - #game_room.round_state.answered)
        end

        table.insert(game_room.round_state.answered, {
            score = is_correct and game_room.room_max_player + 1 - #game_room.round_state.answered or 0,
            player = user
        })

        Handlers.utils.reply(json.encode({
            status = 1,
            data = {
                correct = is_correct,
                answer = current_question.correct
            }
        }))(msg)
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room doesnt exists."
        }))(msg)
    end
end)

Handlers.add("broadcast", Handlers.utils.hasMatchingTag("Action", "Broadcast"), function(msg)
    local room_code = json.decode(msg.Data).room_code
    local user = msg.From

    -- Check user if player
    local userExists = false

    for _, player in ipairs(game_room.players) do
        if player == user then
            userExists = true
            break
        end
    end

    if not userExists then
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "User is not registered."
        }))(msg)
        return
    end

    local contentData = json.decode(msg.Data).content

    if GAMEROOMS[room_code] then
        table.insert(GAMEROOMS[room_code].messages, {
            user = user,
            message = contentData
        })

        Handlers.utils.reply(json.encode({
            status = 1,
            message = "Message sent!"
        }))(msg)
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room does not exist."
        }))(msg)
    end
end)

