/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(1, 'A03', 'M11:00-12:00,W11:00-12:00,F11:00-12:00', 'Dr. Smith', 25, 12, 14);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(2, 'A02', 'T13:00-14:00,R13:00-14:00', 'Prof. Johnson', 32, 12, 5);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(3, 'A01', 'M10:00-11:00,W10:00-11:00,F10:00-11:00', 'Dr. Martinez', 19, 12, 9);
INSERT INTO `section` (`sid`, `sectionName`, `time`, `professor`, `courseCid`, `termTid`, `locationLid`) VALUES
(4, 'A04', 'M11:00-12:00,W11:00-12:00,F11:00-12:00', 'Prof. Williams', 7, 12, 3),
(5, 'A02', 'M16:00-17:00,W16:00-17:00,F16:00-17:00', 'Dr. Brown', 40, 12, 11),
(6, 'A03', 'T09:00-10:00,R09:00-10:00', 'Prof. Taylor', 12, 12, 16),
(7, 'A04', 'M12:00-13:00,W12:00-13:00,F12:00-13:00', 'Dr. Garcia', 35, 12, 8),
(8, 'A01', 'M14:00-15:00,W14:00-15:00,F14:00-15:00', 'Prof. Rodriguez', 18, 12, 12),
(9, 'A02', 'T11:00-12:00,R11:00-12:00', 'Dr. Lopez', 29, 12, 6),
(10, 'A03', 'M13:00-14:00,W13:00-14:00,F13:00-14:00', 'Prof. Hernandez', 22, 12, 1),
(11, 'A01', 'M15:00-16:00,W15:00-16:00,F15:00-16:00', 'Dr. Lee', 14, 8, 2),
(12, 'A02', 'T10:00-11:00,R10:00-11:00', 'Prof. Nguyen', 30, 11, 15),
(13, 'A03', 'M17:00-18:00,W17:00-18:00,F17:00-18:00', 'Dr. Kim', 8, 4, 7),
(14, 'A04', 'T13:00-14:00,R13:00-14:00', 'Prof. Wong', 41, 9, 13),
(15, 'A01', 'M11:00-12:00,W11:00-12:00,F11:00-12:00', 'Dr. Chen', 23, 6, 10),
(16, 'A02', 'T16:00-17:00,R16:00-17:00', 'Prof. Patel', 37, 3, 4),
(17, 'A03', 'M09:00-10:00,W09:00-10:00,F09:00-10:00', 'Dr. Gupta', 16, 12, 11),
(18, 'A04', 'T12:00-13:00,R12:00-13:00', 'Prof. Singh', 27, 5, 6),
(19, 'A01', 'M14:00-15:00,W14:00-15:00,F14:00-15:00', 'Dr. Patel', 33, 10, 9),
(20, 'A02', 'T15:00-16:00,R15:00-16:00', 'Prof. Kumar', 11, 7, 16),
(21, 'A03', 'M13:00-14:00,W13:00-14:00,F13:00-14:00', 'Dr. Anderson', 20, 8, 3),
(22, 'A04', 'T11:00-12:00,R11:00-12:00', 'Prof. Garcia', 26, 6, 14),
(23, 'A01', 'M16:00-17:00,W16:00-17:00,F16:00-17:00', 'Dr. Martinez', 39, 12, 5),
(24, 'A02', 'T12:00-13:00,R12:00-13:00', 'Prof. Hernandez', 17, 9, 2),
(25, 'A03', 'M14:00-15:00,W14:00-15:00,F14:00-15:00', 'Dr. Rodriguez', 31, 7, 10),
(26, 'A01', 'M14:00-15:00,W14:00-15:00,F14:00-15:00', 'Dr. Heinz Doofenshmirtz', 15, 12, 10),
(27, 'A05', 'M12:00-13:00,W12:00-13:00,F12:00-13:00', 'Dr. Rodriguez', 7, 12, 3);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;