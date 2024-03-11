/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

INSERT INTO `course` (`courseName`, `department`, `courseNumber`, `description`) VALUES
('Introductory Computer Science', 'Computer Science', 1010, 'An introduction to computer programming using a procedural high level language.'),
('Computer Programming for Scientists and Engineers', 'Computer Science', 1012, 'An introduction to computer programming suitable for solving problems in science and engineering. Students will implement algorithms for numerical processing, statistical analysis and matrix operations.'),
('Introductory Computer Science 2', 'Computer Science', 1020, 'More features of a procedural language, elements of programming.'),
('Computing: Ideas and Innovation', 'Computer Science', 1500, 'An introduction to the topics of Computer Science and problem solving. Students will learn concepts in computer programming.'),
('Analysis of Algorithms', 'Computer Science', 2080, 'Methods of analyzing the time and space requirements of algorithms. Average case and worst case analysis. Models of computation.'),
('Data Structures and Algorithms', 'Computer Science', 2140, 'Introduction to the representation and manipulation of data structures. Topics will include lists, stacks, queues, trees, and graphs.'),
('Object Orientation', 'Computer Science', 2150, 'Design and development of object-oriented software. Topics will include inheritance, polymorphism, data abstraction and encapsulation. Examples will be drawn from several programming languages.'),
('Programming Practices', 'Computer Science', 2160, 'Introduction to issues involved in real-world computing. Topics will include memory management, debugging, compilation, performance, and good programming practices.'),
('Introduction to Computer Systems', 'Computer Science', 2280, 'Data representation and manipulation, machine-level representation of programs, assembly language programming, and basic computer architecture.'),
('Distributed Computing', 'Computer Science', 3010, 'An introduction to the development of client server and peer-to-peer systems through web applications, distributed programming models, and distributed algorithms.'),
('Human-Computer Interaction', 'Computer Science', 3020, 'Human-computer interaction: human factors and usability, user-centered design, prototyping, usability evaluation.'),
('Automata Theory and Formal Languages', 'Computer Science', 3030, 'An introduction to automata theory, grammars, formal languages and their applications. Topics: finite automata, regular expressions and their properties; context-free grammars, pushdown automata and properties of context-free languages; Turing machines and their properties.'),
('Analysis of Algorithms and Data Structures', 'Computer Science', 3170, 'Fundamental algorithms for sorting, searching, storage management, graphs, databases and computational geometry. Correctness and analysis of those algorithms using specific data structures. An introduction to lower bounds and intractability.'),
('Software Engineering 1', 'Computer Science', 3350, 'Introduction to software engineering. Software life cycle models, system and software requirements analysis, specifications, software design, testing and maintenance, software quality.'),
('Databases Concepts and Usage', 'Computer Science', 3380, 'An introduction to database systems including the relational, hierarchical, network and entity-relationship models with emphasis on the relational model and SQL.'),
('Operating Systems', 'Computer Science', 3430, 'Operating systems, their design, implementation, and usage. COMP 2160 is recommended for Computer Engineering Students.'),
('Software Engineering 2', 'Computer Science', 4350, 'Advanced treatment of software development methods. Topics will be selected from requirements gathering, design methodologies, prototyping, software verification and validation.'),
('Database Implementation', 'Computer Science', 4380, 'Implementation of modern database systems including query modification/optimization, recovery, concurrency, integrity, and distribution.'),
('Artificial Intelligence', 'Computer Science', 4190, 'Reasoning with temporal knowledge; causal reasoning; plausible reasoning; nonmonotonic reasoning; abductive reasoning.'),
('Operating Systems 2', 'Computer Science', 4430, 'Design and implementation of modern operating systems. Detailed analysis of an open source modern operating system and hands-on experience with its kernel and major components.'),
('Professional Practice in Computer Science', 'Computer Science', 4620, 'Background and rationale to view Computer Science in a professional context. Examination of professional ethics, intellectual property, and privacy considerations important to Computer Scientists.');

INSERT INTO `course` (`courseNumber`, `courseName`, `department`, `description`) VALUES
(1000, 'Basic Statistical Analysis', 'Statistics', 'An introduction to the basic principles of statistics and procedures used for data analysis. Topics to be covered include: gathering data, displaying and summarizing data, examining relationships between variables, sampling distributions, estimation and significance tests, inference for means.'),
(2000, 'Basic Statistical Analysis 2', 'Statistics', 'The study of estimation and hypothesis testing procedures for means and proportions in one, two and multiple sample situations, introduction to the analysis of variance; regression and correlation analysis; optional topics may include nonparametric procedures, design of experiments, probability models.'),
(2150, 'Statistics and Computing ', 'Statistics', 'Topics to be covered include: exploratory data analysis and visualization, graphical methods, random number generation, random variables, simple statistical models and computing, Monte Carlo methods, large sample and simulation-based inference, statistical software packages.'),
(2400, 'Introduction to Probability', 'Statistics', 'Basic probability, discrete and continuous random variables, important families of distributions, functions of a random variable, expectation and variance, introduction to joint distributions.'),
(2800, 'Introduction to Probability 2', 'Statistics', 'Joint and conditional distributions, distributions of functions of random variables, laws of total expectation and variance, moments and generating functions.'),
(3000, 'Applied Linear Statistical Models', 'Statistics', 'Applied linear regression, analysis of variance for designed experiments and related topics. This course is not for use in any of the Major, Honours or Joint Honours degree programs in Statistics.'),
(3030, 'Introduction to Stochastic Processes', 'Statistics', 'Review of conditional probability and expectations, Markov chains, homogeneous and nonhomogeneous Poisson processes. Optional topics include: reliability theory, queuing theory and Brownian motion.'),
(3100, 'Introduction to Statistical Inference', 'Statistics', 'Overview of the most common approaches to inference associated with point estimation, confidence intervals and hypothesis testing, including likelihood, least-squares and moment-based methods, as well as large sample approximations.'),
(3150, 'Statistical Computing', 'Statistics', 'Programming using statistical software, random number generation, principles of Monte Carlo simulation, simulation-based inference, Monte Carlo integration, and other related topics.'),
(3450, 'Linear Models', 'Statistics', 'Least-squares approach to simple and multiple regression, one-way analysis of variance, two-way analysis of variance and related topics.');

INSERT INTO `course` (`courseNumber`, `courseName`, `department`, `description`) VALUES
(1300, 'Vector Geometry and Linear Algebra', 'Mathematics', 'An introduction to vectors, matrices, systems of linear equations and three-dimensional geometry.'),
(1500, 'Introduction to Calculus', 'Mathematics', 'Differentiation and integration of elementary functions, with applications to maxima and minima, rates of change, area, and volume.'),
(1700, 'Calculus 2', 'Mathematics', 'Theory and techniques of integration, curve sketching, volume, arc length, surface area and partial derivatives.'),
(1240, 'Elementary Discrete Mathematics', 'Mathematics', 'An introduction to mathematical ideas, proof, techniques, and mathematical writing, explored through topics in discrete mathematics.'),
(2030, 'Combinatorics 1', 'Mathematics', 'Introductory combinatorics, including basic counting, permutations and combinations, enumeration, inclusion-exclusion, pigeonhole principle, solving basic recursions, relations, and derangements.'),
(2070, 'Graph Theory 1', 'Mathematics', 'Introduction to graphs, digraphs, and multigraphs. Topics include trees, cycles and circuits, planarity, basic graph algorithms, and applications of graph theory to social and physical sciences.'),
(2080, 'Introduction to Analysis', 'Mathematics', 'Fundamental properties of the real number system as a complete ordered field, Archimedean property, existence of square roots, density of rational numbers, uncountability of real numbers. Sequences, subsequences, limit theorems, monotonicity, Bolzano-Weierstrass theorem, Cauchy sequences. Rigorous treatment of limits and continuity of functions of one and several variables. Uniform continuity. Applications.'),
(2150, 'Multivariable Calculus', 'Mathematics', "Functions of several variables. Level curves. Partial derivatives, gradient, divergence and curl. Max/min problems. Double and triple integrals, line and surface integrals of functions and vector fields, and applications. Green's, Stokes, and divergence theorems."),
(2720, 'Multivariable Calculus', 'Mathematics', 'Calculus of several variables.'),
(3360, 'Combinatorics 2', 'Mathematics', 'Advanced topics in combinatorics, including generating functions, elementary design theory, recurrences, chains and antichains, Polya counting.'),
(3370, 'Graph Theory 2', 'Mathematics', 'Advanced topics in graph theory, including matchings and coverings, optimization, factors, flows, extremal graph theory, basic Ramsey theory, connectivity, and spectral graph theory. Selected applications in science and operations research are studied.');

INSERT INTO `course` (`courseNumber`, `courseName`, `department`, `description`) VALUES
(2010, 'Tools and Techniques for Data Science', 'Data Science', 'An introduction to the field of data science with an emphasis on the fundamental tools and techniques that underlie the field of data science.'),
(3010, 'Data Science with Real World Data Sets', 'Data Science', 'This course will expose students to real-world data sets in the study of data science.'),
(4010, 'Data Science Capstone Project', 'Data Science', 'A project course where students apply the knowledge and skills acquired in earlier coursework to a substantial data science problem. It will enable the development of soft skills, and explicit consideration of important topics including Ethics, Communication, Data Privacy, Data Presentation and Insight Delivery, all of which are key elements for a training in Data Science, beyond the technical content.');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;