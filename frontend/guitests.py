import os
import unittest


from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class selenium_tests(unittest.TestCase):
    def setUp(self):
        exec_path = os.path.join(os.getcwd(), "geckodriver.exe")
        if os.path.exists(exec_path):
            self.driver = webdriver.Firefox(executable_path=exec_path)
        else:
            self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(5)

    def test_doctors(self):
        self.driver.get("https://www.doctorsearch.me")
        self.assertIn("Doctor Search", self.driver.title)
        doctors_button = self.driver.find_element_by_xpath(
            "/html/body/div/div/div[1]/header/div/button[1]/span[1]"
        )
        doctors_button.click()
        cards = self.driver.find_elements_by_css_selector(
            ".MuiPaper-root.MuiPaper-elevation1.MuiCard-root.MuiPaper-rounded"
        )
        assert len(cards) == 9
        for card in cards:
            p_tags = card.find_elements_by_css_selector("p.MuiTypography-root")
            assert len(p_tags) == 5
            assert "Specialty" in p_tags[1].text
            assert "Phone" in p_tags[2].text
            assert "Rating" in p_tags[3].text
            assert "Gender" in p_tags[4].text
        assert "doctors" in self.driver.current_url

    def test_specialties(self):
        self.driver.get("https://www.doctorsearch.me")
        self.assertIn("Doctor Search", self.driver.title)
        specialties_button = self.driver.find_element_by_xpath(
            "/html/body/div/div/div[1]/header/div/button[3]/span[1]"
        )
        specialties_button.click()
        rows = self.driver.find_elements_by_css_selector(
            ".MuiTableRow-root.MuiTableRow-hover"
        )
        assert len(rows) == 10
        for row in rows:
            tds = row.find_elements_by_tag_name("td")
            assert len(tds) == 5
            assert (
                tds[1].text.startswith("Specializes")
                or tds[1].text == "Definition to come..."
            )
            assert tds[2].text in ("Medical", "Dental")
            assert tds[3].text.isdigit()
            assert tds[4].text.isdigit()
        assert "specialties" in self.driver.current_url

    def test_cities(self):
        self.driver.get("https://www.doctorsearch.me")
        self.assertIn("Doctor Search", self.driver.title)
        doctors_button = self.driver.find_element_by_xpath(
            "/html/body/div/div/div[1]/header/div/button[2]/span[1]"
        )
        doctors_button.click()
        cards = self.driver.find_elements_by_css_selector(
            ".MuiPaper-root.MuiPaper-elevation1.MuiCard-root.MuiPaper-rounded"
        )
        assert len(cards) == 9
        for card in cards:
            p_tags = card.find_elements_by_css_selector("p.MuiTypography-root")
            assert len(p_tags) == 4
            assert "Population" in p_tags[0].text
            assert "Number of Doctors" in p_tags[1].text
            assert "Number of Specialties" in p_tags[2].text
            assert "Elevation" in p_tags[3].text
        assert "cities" in self.driver.current_url

    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()
