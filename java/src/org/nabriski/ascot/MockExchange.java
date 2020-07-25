package org.nabriski.ascot;

import java.util.Map;

import org.apache.camel.CamelContext;
import org.apache.camel.Endpoint;
import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Message;
import org.apache.camel.spi.UnitOfWork;

public class MockExchange implements Exchange {

    @Override
    public <T extends Exchange> T adapt(Class<T> type) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Exchange copy() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public CamelContext getContext() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public long getCreated() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public Exception getException() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <T> T getException(Class<T> type) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String getExchangeId() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Endpoint getFromEndpoint() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String getFromRouteId() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Message getIn() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <T> T getIn(Class<T> type) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Message getMessage() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <T> T getMessage(Class<T> type) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Message getOut() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <T> T getOut(Class<T> type) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ExchangePattern getPattern() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Map<String, Object> getProperties() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object getProperty(String name) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object getProperty(String name, Object defaultValue) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <T> T getProperty(String name, Class<T> type) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <T> T getProperty(String name, Object defaultValue, Class<T> type) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public UnitOfWork getUnitOfWork() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean hasOut() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean hasProperties() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isExternalRedelivered() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isFailed() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isRollbackOnly() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isRollbackOnlyLast() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isRouteStop() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isTransacted() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean removeProperties(String pattern) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean removeProperties(String pattern, String... excludePatterns) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public Object removeProperty(String name) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void setException(Throwable t) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setExchangeId(String id) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setIn(Message in) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setMessage(Message message) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setOut(Message out) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setPattern(ExchangePattern pattern) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setProperty(String name, Object value) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setRollbackOnly(boolean rollbackOnly) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setRollbackOnlyLast(boolean rollbackOnlyLast) {
        // TODO Auto-generated method stub

    }

    @Override
    public void setRouteStop(boolean routeStop) {
        // TODO Auto-generated method stub

    }
    
}