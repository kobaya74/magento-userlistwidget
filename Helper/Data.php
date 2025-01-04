<?php

namespace Alex74\UserListWidget\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Helper\Context;

class Data extends AbstractHelper
{

    /**
    * Admin configuration paths
    *
    */
    const string IS_ENABLED = 'userlistwidget/general/enable';
    const string API_URL = 'userlistwidget/general/api_url';

    /**
    * @var ScopeConfigInterface
    */
    protected $scopeConfig;

    /**
    * Data constructor
    * @param Context $context
    * @param ScopeConfigInterface $scopeConfig
    */
    public function __construct(
        Context $context,
        ScopeConfigInterface $scopeConfig
    ) {
    parent::__construct($context);
    }

    /**
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->scopeConfig->getValue(self::IS_ENABLED,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * @return string
     */
    public function getApiUrl(): string
    {
        return $this->scopeConfig->getValue(self::API_URL,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        ) ?? '';
    }
}
