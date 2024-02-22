/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(1, 'A02', '8:00 PM', 'Robert', 1, 1, 2);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(2, 'B01', '10:00 AM', 'Jennifer', 2, 2, 5);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(3, 'C03', '1:00 PM', 'Michael', 3, 3, 7);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(4, 'D01', '9:00 AM', 'Emily', 4, 4, 9),
(5, 'E02', '2:00 PM', 'David', 5, 5, 11),
(6, 'F01', '11:00 AM', 'Jessica', 6, 6, 13),
(7, 'G03', '3:00 PM', 'Christopher', 7, 7, 15),
(8, 'H01', '10:00 AM', 'Sarah', 8, 8, 17),
(9, 'I02', '12:00 PM', 'Daniel', 9, 9, 19),
(10, 'J01', '11:00 AM', 'Karen', 10, 10, 20),
(11, 'K03', '2:00 PM', 'Andrew', 11, 1, 3),
(12, 'L01', '9:00 AM', 'Michelle', 12, 2, 6),
(13, 'M02', '11:00 AM', 'William', 13, 3, 8),
(14, 'N01', '10:00 AM', 'Elizabeth', 14, 4, 10),
(15, 'O03', '3:00 PM', 'John', 15, 5, 12),
(16, 'P01', '1:00 PM', 'Amanda', 16, 6, 14),
(17, 'Q02', '12:00 PM', 'Kevin', 17, 7, 16),
(18, 'R01', '10:00 AM', 'Rachel', 18, 8, 18),
(19, 'S03', '2:00 PM', 'Thomas', 19, 9, 2),
(20, 'T01', '11:00 AM', 'Laura', 20, 10, 4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;