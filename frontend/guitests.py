import os
import unittest


from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException


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

    def test_about(self):
        self.driver.get("https://www.doctorsearch.me")
        self.assertIn("Doctor Search", self.driver.title)
        about_button = self.driver.find_element_by_xpath(
            "/html/body/div/div/div[1]/header/div/button[4]/span[1]"
        )
        about_button.click()
        people = self.driver.find_elements_by_css_selector(
            ".MuiPaper-root.MuiPaper-elevation1.MuiCard-root.MuiPaper-rounded"
        )

        assert len(people) == 5

        for person in people:
            p_tags = person.find_elements_by_tag_name("p")
            assert len(p_tags) == 2
            assert "Role" in p_tags[1].text
        assert "about" in self.driver.current_url


    def test_back_doctor(self):
        """
        Test to check back to home button from Doctors
        """
        self.driver.get("https://www.doctorsearch.me/doctors")
        try:
            self.driver.find_element_by_xpath(
            "/html/body/div/div/div[1]/header/div/h6"
        ).click()
            pass
        except NoSuchElementException:
            self.fail("The element does not exist")

    def test_back_city(self):
        """
        Test to check back to home button from Cities
        """
        self.driver.get("https://www.doctorsearch.me/cities")
        try:
            self.driver.find_element_by_xpath(
            "/html/body/div/div/div[1]/header/div/h6"
        ).click()
            pass
        except NoSuchElementException:
            self.fail("The element does not exist")

    def test_back_specialty(self):
        """
        Test to check back to home button from Specialties
        """
        self.driver.get("https://www.doctorsearch.me/specialties")
        try:
            self.driver.find_element_by_xpath(
            "/html/body/div/div/div[1]/header/div/h6"
        ).click()
            pass
        except NoSuchElementException:
            self.fail("The element does not exist")

    def test_back_about(self):
        """
        Test to check back to home button from About
        """
        self.driver.get("https://www.doctorsearch.me/about")
        try:
            self.driver.find_element_by_xpath(
            "/html/body/div/div/div[1]/header/div/h6"
        ).click()
            pass
        except NoSuchElementException:
            self.fail("The element does not exist")


    def test_search_doctor(self):
        """
        Enter text in search field on doctor page, hit enter
        and see if the url is correct 
        """
        self.driver.get("https://www.doctorsearch.me/doctors")
        search_bar = self.driver.find_element_by_tag_name("input")
        if not search_bar:
            self.fail("There is no search input!")
        
        try:
            search_bar.send_keys("Matt")
            search_bar.send_keys(Keys.ENTER)
        except Exception as e:
            self.fail("Something went wrong")
        else:
            if self.driver.current_url != "https://www.doctorsearch.me/search/Matt":
                self.fail("The search url is not as expected. Actual: " + str(self.driver.current_url))

    def test_search_city(self):
        """
        Enter text in search field on city page, hit enter
        and see if the url is correct 
        """
        self.driver.get("https://www.doctorsearch.me/cities")
        search_bar = self.driver.find_element_by_tag_name("input")
        if not search_bar:
            self.fail("There is no search input!")
        
        try:
            search_bar.send_keys("Austin")
            search_bar.send_keys(Keys.ENTER)
        except Exception as e:
            self.fail("Something went wrong")
        else:
            if self.driver.current_url != "https://www.doctorsearch.me/search/Austin":
                self.fail("The search url is not as expected. Actual: " + str(self.driver.current_url))

    def test_search_specialty(self):
        """
        Enter text in search field on specialty page, hit enter
        and see if the url is correct 
        """
        self.driver.get("https://www.doctorsearch.me/specialties")
        search_bar = self.driver.find_element_by_tag_name("input")
        if not search_bar:
            self.fail("There is no search input!")
        
        try:
            search_bar.send_keys("Surgeon")
            search_bar.send_keys(Keys.ENTER)
        except Exception as e:
            self.fail("Something went wrong")
        else:
            if self.driver.current_url != "https://www.doctorsearch.me/search/Surgeon":
                self.fail("The search url is not as expected. Actual: " + str(self.driver.current_url))



    def tearDown(self):
        self.driver.quit()


if __name__ == "__main__":
    unittest.main()