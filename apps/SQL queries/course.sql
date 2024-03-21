/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `course` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `courseNumber` int(11) NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `departmentDid` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `FK_c1e3e3b3f8ec0c5446fa7f8e05b` (`departmentDid`),
  CONSTRAINT `FK_c1e3e3b3f8ec0c5446fa7f8e05b` FOREIGN KEY (`departmentDid`) REFERENCES `department` (`did`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

INSERT INTO `course` (`cid`, `courseNumber`, `courseName`, `description`, `departmentDid`) VALUES
(1, 1010, 'Introductory Computer Science', 'An introduction to computer programming using a procedural high level language.', 1);
INSERT INTO `course` (`cid`, `courseNumber`, `courseName`, `description`, `departmentDid`) VALUES
(2, 1012, 'Computer Programming for Scientists and Engineers', 'An introduction to computer programming suitable for solving problems in science and engineering. Students will implement algorithms for numerical processing, statistical analysis and matrix operations.', 1);
INSERT INTO `course` (`cid`, `courseNumber`, `courseName`, `description`, `departmentDid`) VALUES
(3, 1020, 'Introductory Computer Science 2', 'More features of a procedural language, elements of programming.', 1);
INSERT INTO `course` (`cid`, `courseNumber`, `courseName`, `description`, `departmentDid`) VALUES
(4, 1500, 'Computing: Ideas and Innovation', 'An introduction to the topics of Computer Science and problem solving. Students will learn concepts in computer programming.', 1),
(5, 2080, 'Analysis of Algorithms', 'Methods of analyzing the time and space requirements of algorithms. Average case and worst case analysis. Models of computation.', 1),
(6, 2140, 'Data Structures and Algorithms', 'Introduction to the representation and manipulation of data structures. Topics will include lists, stacks, queues, trees, and graphs.', 1),
(7, 2150, 'Object Orientation', 'Design and development of object-oriented software. Topics will include inheritance, polymorphism, data abstraction and encapsulation. Examples will be drawn from several programming languages.', 1),
(8, 2160, 'Programming Practices', 'Introduction to issues involved in real-world computing. Topics will include memory management, debugging, compilation, performance, and good programming practices.', 1),
(9, 2280, 'Introduction to Computer Systems', 'Data representation and manipulation, machine-level representation of programs, assembly language programming, and basic computer architecture.', 1),
(10, 3010, 'Distributed Computing', 'An introduction to the development of client server and peer-to-peer systems through web applications, distributed programming models, and distributed algorithms.', 1),
(11, 3020, 'Human-Computer Interaction', 'Human-computer interaction: human factors and usability, user-centered design, prototyping, usability evaluation.', 1),
(12, 3030, 'Automata Theory and Formal Languages', 'An introduction to automata theory, grammars, formal languages and their applications. Topics: finite automata, regular expressions and their properties; context-free grammars, pushdown automata and properties of context-free languages; Turing machines an', 1),
(13, 3170, 'Analysis of Algorithms and Data Structures', 'Fundamental algorithms for sorting, searching, storage management, graphs, databases and computational geometry. Correctness and analysis of those algorithms using specific data structures. An introduction to lower bounds and intractability.', 1),
(14, 3350, 'Software Engineering 1', 'Introduction to software engineering. Software life cycle models, system and software requirements analysis, specifications, software design, testing and maintenance, software quality.', 1),
(15, 3380, 'Databases Concepts and Usage', 'An introduction to database systems including the relational, hierarchical, network and entity-relationship models with emphasis on the relational model and SQL.', 1),
(16, 3430, 'Operating Systems', 'Operating systems, their design, implementation, and usage. COMP 2160 is recommended for Computer Engineering Students.', 1),
(17, 4350, 'Software Engineering 2', 'Advanced treatment of software development methods. Topics will be selected from requirements gathering, design methodologies, prototyping, software verification and validation.', 1),
(18, 4380, 'Database Implementation', 'Implementation of modern database systems including query modification/optimization, recovery, concurrency, integrity, and distribution.', 1),
(19, 4190, 'Artificial Intelligence', 'Reasoning with temporal knowledge; causal reasoning; plausible reasoning; nonmonotonic reasoning; abductive reasoning.', 1),
(20, 4430, 'Operating Systems 2', 'Design and implementation of modern operating systems. Detailed analysis of an open source modern operating system and hands-on experience with its kernel and major components.', 1),
(21, 4620, 'Professional Practice in Computer Science', 'Background and rationale to view Computer Science in a professional context. Examination of professional ethics, intellectual property, and privacy considerations important to Computer Scientists.', 1),
(22, 1000, 'Basic Statistical Analysis', 'An introduction to the basic principles of statistics and procedures used for data analysis. Topics to be covered include: gathering data, displaying and summarizing data, examining relationships between variables, sampling distributions, estimation and s', 2),
(23, 2000, 'Basic Statistical Analysis 2', 'The study of estimation and hypothesis testing procedures for means and proportions in one, two and multiple sample situations, introduction to the analysis of variance; regression and correlation analysis; optional topics may include nonparametric proced', 2),
(24, 2150, 'Statistics and Computing ', 'Topics to be covered include: exploratory data analysis and visualization, graphical methods, random number generation, random variables, simple statistical models and computing, Monte Carlo methods, large sample and simulation-based inference, statistica', 2),
(25, 2400, 'Introduction to Probability', 'Basic probability, discrete and continuous random variables, important families of distributions, functions of a random variable, expectation and variance, introduction to joint distributions.', 2),
(26, 2800, 'Introduction to Probability 2', 'Joint and conditional distributions, distributions of functions of random variables, laws of total expectation and variance, moments and generating functions.', 2),
(27, 3000, 'Applied Linear Statistical Models', 'Applied linear regression, analysis of variance for designed experiments and related topics. This course is not for use in any of the Major, Honours or Joint Honours degree programs in Statistics.', 2),
(28, 3030, 'Introduction to Stochastic Processes', 'Review of conditional probability and expectations, Markov chains, homogeneous and nonhomogeneous Poisson processes. Optional topics include: reliability theory, queuing theory and Brownian motion.', 2),
(29, 3100, 'Introduction to Statistical Inference', 'Overview of the most common approaches to inference associated with point estimation, confidence intervals and hypothesis testing, including likelihood, least-squares and moment-based methods, as well as large sample approximations.', 2),
(30, 3150, 'Statistical Computing', 'Programming using statistical software, random number generation, principles of Monte Carlo simulation, simulation-based inference, Monte Carlo integration, and other related topics.', 2),
(31, 3450, 'Linear Models', 'Least-squares approach to simple and multiple regression, one-way analysis of variance, two-way analysis of variance and related topics.', 3),
(32, 1300, 'Vector Geometry and Linear Algebra', 'An introduction to vectors, matrices, systems of linear equations and three-dimensional geometry.', 3),
(33, 1500, 'Introduction to Calculus', 'Differentiation and integration of elementary functions, with applications to maxima and minima, rates of change, area, and volume.', 3),
(34, 1700, 'Calculus 2', 'Theory and techniques of integration, curve sketching, volume, arc length, surface area and partial derivatives.', 3),
(35, 1240, 'Elementary Discrete Mathematics', 'An introduction to mathematical ideas, proof, techniques, and mathematical writing, explored through topics in discrete mathematics.', 3),
(36, 2030, 'Combinatorics 1', 'Introductory combinatorics, including basic counting, permutations and combinations, enumeration, inclusion-exclusion, pigeonhole principle, solving basic recursions, relations, and derangements.', 3),
(37, 2070, 'Graph Theory 1', 'Introduction to graphs, digraphs, and multigraphs. Topics include trees, cycles and circuits, planarity, basic graph algorithms, and applications of graph theory to social and physical sciences.', 3),
(38, 2080, 'Introduction to Analysis', 'Fundamental properties of the real number system as a complete ordered field, Archimedean property, existence of square roots, density of rational numbers, uncountability of real numbers. Sequences, subsequences, limit theorems, monotonicity, Bolzano-Weie', 3),
(39, 2150, 'Multivariable Calculus', 'Functions of several variables. Level curves. Partial derivatives, gradient, divergence and curl. Max/min problems. Double and triple integrals, line and surface integrals of functions and vector fields, and applications. Green\'s, Stokes, and divergence t', 3),
(40, 2720, 'Multivariable Calculus', 'Calculus of several variables.', 3),
(41, 3360, 'Combinatorics 2', 'Advanced topics in combinatorics, including generating functions, elementary design theory, recurrences, chains and antichains, Polya counting.', 3),
(42, 3370, 'Graph Theory 2', 'Advanced topics in graph theory, including matchings and coverings, optimization, factors, flows, extremal graph theory, basic Ramsey theory, connectivity, and spectral graph theory. Selected applications in science and operations research are studied.', 3),
(43, 2010, 'Tools and Techniques for Data Science', 'An introduction to the field of data science with an emphasis on the fundamental tools and techniques that underlie the field of data science.', 3),
(44, 3010, 'Data Science with Real World Data Sets', 'This course will expose students to real-world data sets in the study of data science.', 3),
(45, 4010, 'Data Science Capstone Project', 'A project course where students apply the knowledge and skills acquired in earlier coursework to a substantial data science problem. It will enable the development of soft skills, and explicit consideration of important topics including Ethics, Communicat', 3);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;