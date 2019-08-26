const puppeteer = require('puppeteer');
const fs = require('fs');

function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            links = [
                "https://www.nerdwallet.com/the-best-credit-cards",
            ];
            paged_link = "https://www.nerdwallet.com/rewards-credit-cards?amex=1&category_1_spend=200&category_2_spend=200&category_3_spend=200&category_4_spend=200&credit_score=excellent&discover=1&has_annual_fee=1&has_balance_transfer_fee=1&has_foreign_transaction_fee=1&include_amex=1&include_bank_of_america=1&include_barclays=1&include_capital_one=1&include_chase=1&include_citibank=1&include_credit_unions=0&include_discover=1&include_other_banks=1&include_us_bank=1&include_wells_fargo=1&page=1&sort_key=editors_rating_signup_bonus_backup&spend=2200&time_with_card=2&vmc=1"

            page_counts = {
                "rewards-credit-cards": 14,
                "cash-rewards-credit-cards": 8,
                "travel-miles-credit-cards": 4,
                "credit-card-bonus-offers": 7,
                "business-credit-cards": 8,
            }
            for (const [category, page_count] of Object.entries(page_counts)) {
                category_paged_link = paged_link.replace('rewards-credit-cards', category);
                for (i = 1; i <= page_count; i++) {
                    links.push(category_paged_link.replace('page=1', 'page=' + i));
                }
            }
            
            var all_results = [];

            for (let link of links) {
                await page.goto(link);
                results = await page.evaluate(() => {
                    let results = [];
                    let items = document.querySelectorAll('article');
                    items.forEach((item) => {
                        result = {};

                        // Get image
                        image = item.getElementsByClassName('card-image-apply-set__image-link')[0].querySelector('img');
                        result['image_url'] = image.src;
                        card_name = image.alt;
                        
                        replacements = {
                            // Don't change order. Replacement is applied in the order.
                            "<sup>&reg;</sup>": "®",
                            "&reg;": "®",
                            "<sup>&trade;</sup>": "™",
                            "&trade;": "™",
                            "<sup>&#8482;</sup>": "™",
                            "&#8482;": "™",
                            "<sup>&#8480;</sup>": "℠",
                            "&#8480;": "℠",
                        }

                        for (const [key, value] of Object.entries(replacements)) {
                            if (card_name.includes(key)) {
                                card_name = card_name.replace(new RegExp(key, 'g'), value);
                            }
                        }
                        result['card_name'] = card_name;
                        
                        // Get bullet points
                        read_more_button = item.getElementsByClassName('marketing-bullets-drawer__toggle-label');
                        read_more_button[0].click();
                        bullets = item.getElementsByClassName('card-marketing-bullets__item');
                        bullets_text = [];
                        for (let bullet of bullets) {
                            text = bullet.querySelector('p').textContent;
                            if (!bullets_text.includes(text)) {
                                bullets_text.push(text);
                            }
                        }
                        result['bullet_points'] = bullets_text;

                        // Get metadata
                        detail_items = item.getElementsByClassName('card-details__item');
                        metadata = {}
                        for (let item of detail_items) {
                            if (item.getElementsByClassName('card-details__header').length == 1) {
                                key = item.getElementsByClassName('card-details__header')[0].textContent;
                                value = item.getElementsByClassName('card-details__content')[0].querySelector('p').textContent;
                            } else { // Recommended Credit Score
                                key = item.getElementsByClassName('header-text')[0].textContent;
                                value = item.getElementsByClassName('label-range')[0].textContent;
                                value = value.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                            }
                            result[key] = value;
                        }
                        results.push(result);
                    });
                    return results;
                })

                for (let result of results) {
                    match = false;
                    for (let all_result of all_results) {
                        if (result['card_name'] == all_result['card_name']) {
                            match = true;
                            break;
                        }
                    }
                    if (!match) {
                        all_results.push(result);
                    }
                }
            }
            browser.close();
            console.log(all_results.length);
            fs.writeFile("best-credit-card.json", JSON.stringify(all_results), function(err) {
                if (err) throw err;
                console.log('file write complete');
            });
            return resolve(all_results);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);