/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(1, 'A02', 'M20:00-21:00,W20:00-21:00,F20:00-21:00', 'Robert', 1, 1, 2);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(2, 'B01', 'M10:00-11:00,W10:00-11:00,F10:00-11:00', 'Jennifer', 2, 2, 5);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(3, 'C03', 'M13:00-14:00,W13:00-14:00,F13:00-14:00', 'Michael', 3, 3, 7);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(4, 'D01', 'M09:00-10:00,W09:00-10:00,F09:00-10:00', 'Emily', 4, 4, 9),
(5, 'E02', 'M14:00-15:00,W14:00-15:00,F14:00-15:00', 'David', 5, 5, 11),
(6, 'F01', 'M11:00-12:00,W11:00-12:00,F11:00-12:00', 'Jessica', 6, 6, 13),
(7, 'G03', 'M15:00-16:00,W15:00-16:00,F15:00-16:00', 'Christopher', 7, 7, 15),
(8, 'H01', 'M10:00-11:00,W10:00-11:00,F10:00-11:00', 'Sarah', 8, 8, 17),
(9, 'I02', 'M12:00-13:00,W12:00-13:00,F12:00-13:00', 'Daniel', 9, 9, 19),
(10, 'J01', 'M11:00-12:00,W11:00-12:00,F11:00-12:00', 'Karen', 10, 10, 20),
(11, 'K03', 'M14:00-15:00,W14:00-15:00,F14:00-15:00', 'Andrew', 11, 1, 3),
(12, 'L01', 'M09:00-10:00,W09:00-10:00,F09:00-10:00', 'Michelle', 12, 2, 6),
(13, 'M02', 'M11:00-12:00,W11:00-12:00,F11:00-12:00', 'William', 13, 3, 8),
(14, 'N01', 'M10:00-11:00,W10:00-11:00,F10:00-11:00', 'Elizabeth', 14, 4, 10),
(15, 'O03', 'M15:00-16:00,W15:00-16:00,F15:00-16:00', 'John', 15, 5, 12),
(16, 'P01', 'M13:00-14:00,W13:00-14:00,F13:00-14:00', 'Amanda', 16, 6, 14),
(17, 'Q02', 'M12:00-13:00,W12:00-13:00,F12:00-13:00', 'Kevin', 17, 7, 16),
(18, 'R01', 'R10:00-11:00,F10:00-11:00', 'Rachel', 18, 8, 18),
(19, 'S03', 'R14:00-15:00,F14:00-15:00', 'Thomas', 19, 9, 2),
(20, 'T01', 'R11:00-12:00,F11:00-12:00', 'Laura', 20, 10, 4);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(21, 'U02', 'R09:00-10:00,F09:00-10:00', 'Nathan', 21, 11, 21),
(22, 'V01', 'R13:00-14:00,F13:00-14:00', 'Olivia', 22, 1, 2),
(23, 'W03', 'R15:00-16:00,F15:00-16:00', 'Henry', 23, 2, 3),
(24, 'X01', 'R12:00-13:00,F12:00-13:00', 'Sophia', 24, 3, 4),
(25, 'Y02', 'R10:00-11:00,F10:00-11:00', 'Benjamin', 25, 4, 5),
(26, 'Z01', 'R11:00-12:00,F11:00-12:00', 'Zoe', 26, 5, 6);




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;