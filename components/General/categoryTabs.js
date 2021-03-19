import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import Link from 'next/link';
import styles from '../../styles/General/categoryTabs.module.css';
import useTranslations from "../../hooks/useTranslations";

const CategoryTabs = ({ tabs, id, restaurant, language = 'de', categoryId, categoryData, categoryIntro, categoryItems, preferences, allergens }) => {
  const [activeTab, setActiveTab] = useState(id);

  return (
    <div className={styles.categoryTabs}>

              <Tabs
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  indicatorColor='secondary'
                  variant='scrollable'
                >
                  {tabs
                    .sort((a, b) => a.position - b.position)
                    .map((tab, index) => (
                      
                        tab.showOnTakeAway === true &&(
                          <Tab
                          className='one-tab'
                          key={index}
                          label={
                            <Link
                              href={`/${restaurant}/category/${tab.id}`}
                              passHref
                              scroll={false}
                            >
                              {tab.translations.de.title}
                            </Link>
                          }
                          name={tab.id}
                          value={tab.id}
                        />
                        )
                      

                    ))}
                </Tabs>

    </div>
  );
};

export default CategoryTabs;
